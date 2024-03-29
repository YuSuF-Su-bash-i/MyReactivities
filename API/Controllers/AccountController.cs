
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        public TokenService _tokenService { get; }
        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;

        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if(user == null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if(!result){
                return Unauthorized();
            }

            return CreateUserObject(user);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto){
            if(await _userManager.Users.AnyAsync(s=> s.UserName == registerDto.Username)) {
                ModelState.AddModelError("username", "Username is already taken");
                return ValidationProblem();
            }

            if(await _userManager.Users.AnyAsync(s=> s.Email == registerDto.Email)) {
                ModelState.AddModelError("email", "Email is already taken");
                return ValidationProblem();
            }

            var user = new AppUser {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if(result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser() 
        {
            var emailClaimValue = User.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.FindByEmailAsync(emailClaimValue);

            return CreateUserObject(user);
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName
            };
        }

    }
}