package com.buyracktar.api.security.jwtutils;

import com.buyracktar.api.responsemodels.MyResponseTemplate;
import com.buyracktar.api.services.AccountService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {
	@Autowired
	private AccountService userDetailsService;
	@Autowired
	private TokenManager tokenManager;
	@Override
	protected void doFilterInternal(HttpServletRequest request,
									HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String path = request.getRequestURI();
		if ("/auth/login".equals(path) || "/auth/register".equals(path) || "/auth/refresh".equals(path) || "/register/confirm".equals(path)) {
			filterChain.doFilter(request, response);
			return;
		}
		System.out.println("filer is working ");
		String tokenHeader = request.getHeader("Authorization");
		String username = null;
		String token = null;
		if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
			token = tokenHeader.substring(7);
			if(token.equals("null") || token.equals("undefined"))
				response.sendError(401);
			else {
				try {
					System.out.println("filer parses data");
					username = tokenManager.getUsernameFromToken(token);
				} catch (IllegalArgumentException e) {
					System.out.println("Unable to get JWT Token");
				} catch (ExpiredJwtException e) {
					System.out.println("JWT Token has expired");
					ObjectMapper objectMapper =new ObjectMapper();
					response.sendError(401,objectMapper.writeValueAsString(new MyResponseTemplate(false, null, "token has expired")));
					return ;
				}
				System.out.println("token is valid");
			}
		} else {

		}
		if (null != username && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = userDetailsService.loadUserByUsername(username);
			if (tokenManager.validateJwtToken(token, userDetails)) {
				UsernamePasswordAuthenticationToken
						authenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null,
						userDetails.getAuthorities());
				authenticationToken.setDetails(new
						WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authenticationToken);
			}
		}
		filterChain.doFilter(request, response);
	}
}
