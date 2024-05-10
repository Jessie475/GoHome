package com.goHome.houseRentingPlatform.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

    @Column(name = "roomType", nullable = false, length = 255)
    private String roomType;

    @Column(name = "price", nullable = false)
    private Integer price;

    @Column(name = "restriction", nullable = false, length = 255)
    private String restriction;

    @Column(name = "size", nullable = false)
    private Integer size;

    @Column(name = "subsidy", nullable = false)
    private Boolean subsidy;

    @Column(name = "startdate", nullable = false, length = 255)
    private String startdate;

    @Column(name = "lease", nullable = false)
    private Integer lease;

    @Column(name = "description", nullable = false, length = 255)
    private String description;


    //@ManyToOne
    //@JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    //private User user;

    public House() {
    }

    public House(Integer id, String contactinfo, String address, String name, Double lat, Double lng, Double rate, 
    String roomType, Integer price, String restriction, Integer size, Boolean subsidy, String startdate, Integer lease, String description) {
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
  
  public String getroomType() {
	    return roomType;
	  }

  public void setroomType(String roomType) {
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
  
  public Integer getsize() {
	    return size;
	  }

  public void setsize(Integer size) {
	    this.size = size;
	  } 
  public boolean getsubsidy() {
	    return subsidy;
	  }

  public void setsubsidy(Boolean subsidy) {
	    this.subsidy = subsidy;
	  } 
  
  public String getstartdate() {
	    return startdate;
	  }

  public void setstartdate(String startdate) {
	    this.startdate = startdate;
	  }
 
  public Integer getlease() {
	    return lease;
	  }

  public void setlease(Integer lease) {
	    this.lease = lease;
	  } 

  public String getdescription() {
	    return description;
	  }

  public void setdescription(String description) {
	    this.description = description;
	  } 
}