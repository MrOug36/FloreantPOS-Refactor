
/**
 * ************************************************************************
 * * The contents of this file are subject to the MRPL 1.2 (the "License"),
 * * being the Mozilla Public License Version 1.1 with a permitted attribution clause;
 * * you may not use this file except in compliance with the License.
 * * You may obtain a copy of the License at http://www.floreantpos.org/license.html
 * * Software distributed under the License is distributed on an "AS IS" basis,
 * * WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * * See the License for the specific language governing rights and limitations
 * * under the License. The Original Code is FLOREANT POS.
 * * The Initial Developer of the Original Code is OROCUBE LLC
 * * All portions are Copyright (C) 2015 OROCUBE LLC. All Rights Reserved.
 * ************************************************************************
 */
package com.floreantpos;

import java.util.Optional;

import org.apache.commons.lang.StringUtils;

import com.floreantpos.util.DatabaseConnectionException;

public class Database {
    
    private String host;
    private String port;
    private String dbName;
    private String user;
    private String password;
    
    public Database(String host, String port, String dbName, String user, String password) {
        this.host = Optional.ofNullable(host).orElse("localhost");
        this.port = Optional.ofNullable(port).orElse("5432");
        this.dbName = Optional.ofNullable(dbName).orElse("floreantpos");
        this.user = user;
        this.password = password;
    }
    
    public boolean connect() throws DatabaseConnectionException {
        try {
            // Using StringUtils to check if fields are empty or null
            if (Optional.ofNullable(StringUtils.isEmpty(user) || StringUtils.isEmpty(password)) {
                throw new DatabaseConnectionException("Username or password cannot be empty");
            }

            // Simulate database connection logic
            System.out.println("Connecting to database " + dbName + " at " + host + ":" + port);
            
            // Database connection successful
            return true;
        } catch (Exception e) {
            throw new DatabaseConnectionException("Failed to connect to the database", e);
        }
    }

    public void disconnect() {
        // Simulate disconnection logic
        System.out.println("Disconnected from the database");
    }

    // Getters and setters for database properties using Optional for safety
    public Optional<String> getHost() {
        return Optional.ofNullable(host);
    }

    public void setHost(String host) {
        this.host = host;
    }

    public Optional<String> getPort() {
        return Optional.ofNullable(port);
    }

    public void setPort(String port) {
        this.port = port;
    }

    public Optional<String> getDbName() {
        return Optional.ofNullable(dbName);
    }

    public void setDbName(String dbName) {
        this.dbName = dbName;
    }

    public Optional<String> getUser() {
        return Optional.ofNullable(user);
    }

    public void setUser(String user) {
        this.user = user;
    }

    public Optional<String> getPassword() {
        return Optional.ofNullable(password);
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
