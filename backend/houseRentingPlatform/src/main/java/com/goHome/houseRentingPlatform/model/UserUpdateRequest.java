package com.goHome.houseRentingPlatform.model;


public class UserUpdateRequest {
    private String email;
    private String phone;

    // 构造函数
    public UserUpdateRequest() {
    }

    public UserUpdateRequest(String email, String phone) {
        this.email = email;
        this.phone = phone;
    }

    // Getter 和 Setter 方法
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
