package com.devansh.service;

import com.devansh.exception.TokenInvalidException;
import com.devansh.exception.UserException;
import com.devansh.model.User;

public interface UserService {

    User findByJwtToken(String token) throws UserException, TokenInvalidException;
}
