package com.goHome.houseRentingPlatform.model;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

import com.goHome.houseRentingPlatform.model.Article.ArticleType;

import jakarta.persistence.*;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;


@Entity
@Table(name = "house")
public class House {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "house_id")
    private Integer house_Id;

    @Column(name = "contactInfo", nullable = false, length = 255)
    private String contactInfo;

    @Column(name = "address", nullable = false, length = 255)
    private String address;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "lat", nullable = true)
    private Double lat;

    @Column(name = "lng", nullable = true)
    private Double lng;

    @Column(name = "rate", nullable = true)
    private Double rate;

    @Enumerated(EnumType.STRING)
    @Column(name = "roomType", nullable = false)
    private RoomType roomType;

    @Column(name = "price", nullable = false)
    private Integer price;

    @Column(name = "restriction", nullable = false, length = 255)
    private String restriction;

    @Column(name = "size", nullable = false)
    private Double size;

    @Column(name = "subsidy", nullable = false)
    private Boolean subsidy;

    @Column(name = "startdate", nullable = false)
    private LocalDate startdate;

    @Column(name = "lease", nullable = false)
    private Double lease;

    @Column(name = "description", nullable = false, length = 255)
    private String description;

    @Lob
    @Column(name = "image", nullable = true)
    private byte[] image;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "user_id", nullable = false)
    // private User user;

    //@ManyToOne
    //@JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    //private User user;
    @OneToMany(mappedBy = "house", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<H_Comment> comments;
    public House(){}

    public House(Integer house_id, String contactinfo, String address, String title, Double lat, Double lng, Double rate, 
    RoomType roomType, Integer price, String restriction, Double size, Boolean subsidy, LocalDate startdate, Double lease,String description ) {
        this.house_Id = house_id;
        this.contactInfo = contactinfo;
        this.address = address;
        this.title = title;
        this.lat = lat;
        this.lng = lng;
        this.rate = rate;
        this.roomType = roomType;
        this.price = price;
        this.restriction = restriction;
        this.size = size;
        this.subsidy = subsidy;
        this.startdate = startdate;
        this.lease = lease;
        this.description = description;
    }

    public Integer getId() {
        return house_Id;
    }

    public void setId(Integer id) {
        this.house_Id = id;
    }

    public String getcontactInfo() {
        return contactInfo;
      }
    
    public void setcontactInfo(String contactinfo) {
    this.contactInfo = contactinfo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }
    public Double getRate() {
	    return rate;
	  }

    public void setRate(Double rate) {
      this.rate = rate;
    }
    
    public RoomType getroomType() {
        return roomType;
      }

    public void setroomType(RoomType roomType) {
        this.roomType = roomType;
      }
    
    public Integer getprice() {
        return price;
      }

    public void setprice(Integer price) {
        this.price = price;
      } 
    
    public String getrestriction() {
        return restriction;
      }

    public void setrestriction(String restriction) {
        this.restriction = restriction;
      }
    
    public Double getsize() {
        return size;
      }

    public void setsize(Double size) {
        this.size = size;
      } 
    public boolean getsubsidy() {
        return subsidy;
      }

    public void setsubsidy(Boolean subsidy) {
        this.subsidy = subsidy;
      } 
    
    public LocalDate getstartdate() {
        return startdate;
      }

    public void setstartdate(LocalDate startdate) {
        this.startdate = startdate;
      }
  
    public Double getlease() {
        return lease;
      }

    public void setlease(Double lease) {
        this.lease = lease;
      } 

    public String getdescription() {
        return description;
      }

    public void setdescription(String description) {
        this.description = description;
      }
    public Set<H_Comment> getComments() {
        return comments;
    }

    public void setComments(Set<H_Comment> comments) {
        this.comments = comments;
    }

    public byte[] getImage() {
      return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    // public User getUser() {
    //   return user;
    // }

    // public void setUser(User user) {
    //     this.user = user;
    // }

    public enum RoomType {
        STUDIO, ROOM
    }
}