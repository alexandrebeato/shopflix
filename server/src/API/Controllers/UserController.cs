using API.Models.Users;
using AutoMapper;
using Core.Domain.Interfaces;
using Domain.Users.Repository;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("users")]
    public class UserController : BaseController
    {
        private readonly IUser _user;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        protected UserController(IUser user, IMapper mapper, IUserRepository userRepository) : base(user)
        {
            _user = user ?? throw new ArgumentNullException(nameof(user));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userRepository.GetByEmail(model.Email);

            if (user != null)
                return BadRequest("Email already exists");

            user = Domain.Users.User.Factory.CreateNewUser(model.Id, model.Name, model.Email, model.Password, model.CreatedAt);
            await _userRepository.Insert(user);

            return Ok(new
            {
                // token = _user.GenerateToken(user.Id, user.Name, user.Email),
                user = _mapper.Map<UserModel>(user)
            });
        }
    }
}