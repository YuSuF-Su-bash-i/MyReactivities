using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
  public class Edit
  {
    public class Command : IRequest<Result<Activity>>
    {
      public Activity Activity { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Activity>>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;
      public Handler(DataContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }

      public class CommandValidator : AbstractValidator<Command>
      {
        public CommandValidator()
        {
          RuleFor(a => a.Activity).SetValidator(new ActivityValidator());
        }
      }

      public async Task<Result<Activity>> Handle(Command request, CancellationToken cancellationToken)
      {
        var activity = await _context.Activities.FindAsync(request.Activity.Id);

        if (activity == null)
          return null;

        _mapper.Map(request.Activity, activity);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result)
          return Result<Activity>.Failure("Failed to update activity");


        return Result<Activity>.Success(request.Activity);

        //This is another option to use
        // _context.Activities.Update(request.Activity);
        // await _context.SaveChangesAsync();

        // return request.Activity;
      }
    }
  }
}