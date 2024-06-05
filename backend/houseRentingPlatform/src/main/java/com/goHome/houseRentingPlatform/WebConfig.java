package com.goHome.houseRentingPlatform;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // 允許的前端來源
                .allowedMethods("GET", "POST", "PUT", "DELETE") // 允許的請求方法
                .allowedHeaders("*") // 允許的標頭
                .allowCredentials(true); // 允許憑證（如 Cookie）
    }

    //圖片路徑
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:/Users/raxhel/Desktop/pic/"); //改你自己的路徑
    }
}
