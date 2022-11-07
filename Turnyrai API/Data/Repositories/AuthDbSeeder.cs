using Microsoft.AspNetCore.Identity;
using Turnyrai_API.Auth.Model;

namespace Turnyrai_API.Data.Repositories
{
    public class AuthDbSeeder
    {
        private readonly UserManager<TournamentsRestUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public AuthDbSeeder(UserManager<TournamentsRestUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }
        public async Task SeedAsync()
        {
            await AddDefaultRoles();
            await AddAdminUser();
        }

        private async Task AddAdminUser()
        {
            var newAdminUser = new TournamentsRestUser
            {
                UserName = "admin",
                Email = "admin@admin.com"
            };
            var existingAdminUser = await _userManager.FindByNameAsync(newAdminUser.UserName);
            if (existingAdminUser == null)
            {
                var createAdminUserResult = await _userManager.CreateAsync(newAdminUser, "Password1!");
                if (createAdminUserResult.Succeeded)
                {
                    await _userManager.AddToRolesAsync(newAdminUser, TournamentRoles.All);
                }
            }
            var newTeamOwner = new TournamentsRestUser
            {
                UserName = "teamOwner1",
                Email = "teamOwner1@teamOwner1.com"
            };
            var existingnewTeamOwner = await _userManager.FindByNameAsync(newTeamOwner.UserName);
            if (existingnewTeamOwner == null)
            {
                var createTeamOwnerResult = await _userManager.CreateAsync(newTeamOwner, "Password1!");
                if (createTeamOwnerResult.Succeeded)
                {
                    await _userManager.AddToRoleAsync(newTeamOwner, TournamentRoles.TeamOwner);
                }
            }
            var newTeamOwner2 = new TournamentsRestUser
            {
                UserName = "teamOwner2",
                Email = "teamOwner2@teamOwner2.com"
            };
            var existingnewTeamOwner2 = await _userManager.FindByNameAsync(newTeamOwner2.UserName);
            if (existingnewTeamOwner2 == null)
            {
                var createTeamOwnerResult2 = await _userManager.CreateAsync(newTeamOwner2, "Password1!");
                if (createTeamOwnerResult2.Succeeded)
                {
                    await _userManager.AddToRoleAsync(newTeamOwner2, TournamentRoles.TeamOwner);
                }
            }
        }

        private async Task AddDefaultRoles()
        {
            foreach (var role in TournamentRoles.All)
            {
                var _roleExists = await _roleManager.RoleExistsAsync(role);
                if (!_roleExists)
                    await _roleManager.CreateAsync(new IdentityRole(role));
            }
        }
    }
}
