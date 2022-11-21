using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Activity> {
            public Activity Activity {get; set;}
        }

        public class Handler : IRequestHandler<Command, Activity>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Activity> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                _mapper.Map(request.Activity, activity);

                await _context.SaveChangesAsync();

                return request.Activity;

                //This is another option to use
                // _context.Activities.Update(request.Activity);
                // await _context.SaveChangesAsync();

                // return request.Activity;
            }
  }
    }
}