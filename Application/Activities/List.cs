using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
  public class List
  {
    public class Query : IRequest<Result<List<Activity>>> { }

    public class Handler : IRequestHandler<Query, Result<List<Activity>>>
    {
      private readonly DataContext _context;
      public ILogger<List> _logger { get; }
      public Handler(DataContext context, ILogger<List> logger)
      {
        _logger = logger;
        _context = context;
      }

      public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
      {
        // try{
        //     for(int i = 0; i <10; i++){
        //         cancellationToken.ThrowIfCancellationRequested();
        //         await Task.Delay(1000, cancellationToken);
        //         _logger.LogInformation($"Task {i} completed.");
        //     }
        // } catch(Exception ex) when (ex is TaskCanceledException) {
        //     _logger.LogInformation($"Task cancelled.");
        // }

        return Result<List<Activity>>.Success(await _context.Activities.ToListAsync());
      }
    }
  }
}