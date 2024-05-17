package com.goHome.houseRentingPlatform.model;

import java.util.Date;

import com.goHome.houseRentingPlatform.model.Article.ArticleType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;

@Entity
public class House {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "contactInfo", nullable = false, length = 255)
    private String contactInfo;

    @Column(name = "address", nullable = false, length = 255)
    private String address;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

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
    private Date startdate;

    @Column(name = "lease", nullable = false)
    private Double lease;

    @Column(name = "description", nullable = false, length = 255)
    private String description;

    @Column(name = "condition", nullable = false, length = 255)
    private String condition;

    //@ManyToOne
    //@JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    //private User user;

    public House() {
    }

    public House(Integer id, String contactinfo, String address, String name, Double lat, Double lng, Double rate, 
    RoomType roomType, Integer price, String restriction, Double size, Boolean subsidy, Date startdate, Double lease, String description,String condition) {
        this.id = id;
        this.contactInfo = contactinfo;
        this.address = address;
        this.name = name;
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
        this.condition = condition;

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
    public Double getrate() {
	    return rate;
	  }

  public void setrate(Double rate) {
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
  
  public Date getstartdate() {
	    return startdate;
	  }

  public void setstartdate(Date startdate) {
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

    public String getcondition() {
	    return condition;
	  }

  public void setcondition(String condition) {
	    this.condition = condition;
	  } 
public enum RoomType {
    STUDIO, ROOM
}
}