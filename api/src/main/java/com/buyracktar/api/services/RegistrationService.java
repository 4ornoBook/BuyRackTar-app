package com.buyracktar.api.services;

import com.buyracktar.api.email.EmailSender;
import com.buyracktar.api.entities.Account;
import com.buyracktar.api.entities.ConfirmationToken;
import com.buyracktar.api.entities.RegistrationRequest;
import com.buyracktar.api.entities.User;
import com.buyracktar.api.repositories.AccountRepository;
import com.buyracktar.api.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final AccountService accountService;
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final ConfirmationTokenService confirmationTokenService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final EmailSender emailSender;

    public Account registerNewAccount(RegistrationRequest registrationRequest) {
        Account account= new Account();
        account.setEmail(registrationRequest.getEmail());
        account.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
        User user = new User();
        user.setOwner(true);
        user.setName(account.getEmail() + " owner");
        if(accountRepository.findByEmail(registrationRequest.getEmail()) != null) {
            return null;
        }
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusDays(30),
                account
        );
        confirmationTokenService.saveConfirmationToken(confirmationToken);
//        todo: send email for verification
        String link = "http://localhost:3000/register/confirm?token=" + token;
        emailSender.send(registrationRequest.getEmail(), link);
        return addAccountAndUser(account, user);
    }

    public String confirmToken(String token) {

        ConfirmationToken confirmationToken = confirmationTokenService.getToken(token);
        if(confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }
        LocalDateTime expiresAt = confirmationToken.getExpiresAt();
        if(expiresAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token is expired");
        }
        confirmationTokenService.setConfirmedAt(token);
        accountService.activateAccount(confirmationToken.getAccount().getEmail());
        return "confirmed";
    }

    @Transactional
    public Account addAccountAndUser(Account account, User user) {
        Account savedAccount = accountRepository.save(account);
        user.setAccountId(account.getId());
        userRepository.save(user);
        return savedAccount;
    }
}
