
using Turnyrai_API.Data;
using Turnyrai_API.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<TournamentsDbContext>();

builder.Services.AddTransient<ITournamentsRepository, TournamentsRepository>();
builder.Services.AddTransient<ITeamsRepository, TeamsRepository>();
builder.Services.AddTransient<IPlayersRepository, PlayersRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
/*if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}*/

//app.UseHttpsRedirection();

//app.UseAuthorization();
app.UseRouting();

app.MapControllers();

app.Run();
