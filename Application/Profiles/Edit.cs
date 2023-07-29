using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles;

public class Edit
{
    public class Command : IRequest<Result<Profile>>
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Profile>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;
        public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _userAccessor = userAccessor;
            _mapper = mapper;
            _context = context;
        }

        public async Task<Result<Profile>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

            user.DisplayName = request.DisplayName ?? user.DisplayName;
            user.Bio = request.Bio ?? user.Bio;

            var success = await _context.SaveChangesAsync() > 0;

            if (success) return Result<Profile>.Success(_mapper.Map<Profile>(user));

            return Result<Profile>.Failure("Problem updating profile");
        }
    }
}