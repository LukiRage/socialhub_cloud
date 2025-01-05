package com.springboot.socialhub_api.api.repositories;

import com.springboot.socialhub_api.api.model.Followings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FollowingsRepository extends JpaRepository<Followings, Integer> {
    @Query("SELECT f FROM Followings f WHERE f.user.id = :userId")
    List<Followings> findByUserId(@Param("userId") int userId);

    @Query("SELECT f FROM Followings f WHERE f.followed_user.id = :followedId")
    List<Followings> findByFollowedUserId(@Param("followedId") int followedId);

    @Query("SELECT f FROM Followings f WHERE f.user.id = :userId AND f.followed_user.id = :followedId")
    Optional<Followings> findByUserIdAndFollowedUserId(@Param("userId") int userId, @Param("followedId") int followedId);
}
