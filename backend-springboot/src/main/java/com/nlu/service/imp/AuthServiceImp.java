package com.nlu.service.imp;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nlu.model.entity.Role;
import com.nlu.model.entity.User;
import com.nlu.model.enumeration.ERole;
import com.nlu.model.request.LoginRequest;
import com.nlu.model.request.RegisterRequest;
import com.nlu.model.response.AuthenticationResponse;
import com.nlu.repository.RoleRepository;
import com.nlu.repository.UserRepository;
import com.nlu.security.CustomUserDetails;
import com.nlu.security.jwt.JwtTokenProvider;
import com.nlu.service.AuthService;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AuthServiceImp implements AuthService{
	
	UserRepository userRepository;
	RoleRepository roleRepository;
	PasswordEncoder passwordEncoder;
	JwtTokenProvider jwtTokenProvider;
	UserDetailsService userDetailsService;
	AuthenticationManager authenticationManager;

	@Override
//	@Transactional
	public AuthenticationResponse login(LoginRequest request) {
	    try {
	        // Thực hiện xác thực người dùng
	        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
	                request.getUsername(), request.getPassword());
	        Authentication authentication = authenticationManager.authenticate(token);
	        // Xác thực thành công, tiếp tục xử lý
	        SecurityContextHolder.getContext().setAuthentication(authentication);
	        CustomUserDetails customUserDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(request.getUsername());
	        String jwtToken = jwtTokenProvider.generateToken(customUserDetails);
	        
	        Set<String> listRoles = customUserDetails.getAuthorities().stream()
	                .map(item -> item.getAuthority()).collect(Collectors.toSet());
	        
	        return AuthenticationResponse.builder()
	                .token(jwtToken)
	                .authenticated(true)
	                .listRoles(listRoles)
	                .build();
	    } catch (LockedException e) {
	        // Xử lý trường hợp tài khoản bị khóa
	        // Ví dụ: thông báo cho người dùng biết tài khoản của họ đã bị khóa
	        // và hướng dẫn họ liên hệ với quản trị viên hoặc sử dụng một quy trình khôi phục tài khoản nào đó.
	        // Đồng thời có thể trả về một thông báo lỗi phản hồi HTTP 403 (Forbidden) cho người dùng.
	        return AuthenticationResponse.builder()
	                .error("User account is locked")
	                .authenticated(false)
	                .build();
	    }
	}

	@Transactional
	@Override
	public void register(RegisterRequest request) {
		// TODO Auto-generated method stub
		if(userRepository.existsByUsername(request.getUsername()))
			throw new RuntimeException("username already exists!");
		if(userRepository.existsByEmail(request.getEmail()))
			throw new RuntimeException("email already exists!");
		
		User user = new User();
		user.setUsername(request.getUsername());
		user.setCode(request.getUsername());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setEmail(request.getEmail());
		user.setActive(true);
		List<String> listRoles = request.getListRoles();
		Set<Role> setRoles = new HashSet<>();
		
		if(listRoles.isEmpty()) {
			Role role = roleRepository.findByName(ERole.STUDENT.toString())
					.orElseThrow(() -> new RuntimeException("Role not found!"));
			setRoles.add(role);
		}else {
			listRoles.forEach(role ->{
			Role roleTeacher = roleRepository.findByName(ERole.TEACHER.toString())
			.orElseThrow(() -> new RuntimeException("Role not found!"));
			setRoles.add(roleTeacher);
			});
		}
		user.setListRoles(setRoles);
		
		userRepository.save(user);
		
	}
	
	

}
