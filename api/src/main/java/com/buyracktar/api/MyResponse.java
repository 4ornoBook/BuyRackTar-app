package com.buyracktar.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonRootName;

public class MyResponse {
    boolean success;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    Object data;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    String error;

    public MyResponse(boolean success, Object data, String error) {
        this.success = success;
        this.data = data;
        this.error = error;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
