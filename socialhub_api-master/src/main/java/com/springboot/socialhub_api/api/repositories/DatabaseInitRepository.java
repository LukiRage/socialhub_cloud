package com.springboot.socialhub_api.api.repositories;

import com.springboot.socialhub_api.api.model.DatabaseInit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DatabaseInitRepository extends JpaRepository<DatabaseInit, String> {
}
