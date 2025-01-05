package com.springboot.socialhub_api.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "database_init")
public class DatabaseInit {
    @Id
    private String id;
    private boolean initialized;

    public DatabaseInit() {
        this.id = "INIT";
        this.initialized = false;
    }

    public String getId() {
        return id;
    }

    public boolean isInitialized() {
        return initialized;
    }

    public void setInitialized(boolean initialized) {
        this.initialized = initialized;
    }
}
