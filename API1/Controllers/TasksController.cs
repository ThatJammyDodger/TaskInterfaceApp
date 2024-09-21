using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API1.Controllers;
[Route("api/[controller]")]
[ApiController]
public class TasksController : ControllerBase
{
    private readonly TasksService _tService;

    public TasksController(TasksService tService)
    {
        _tService = tService;
    }

    [HttpGet]
    public async Task<List<User>> Get() =>
        await _tService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<User>> Get(string id)
    {
        var user = await _tService.GetAsync(id);
        if (user is not null)
            return user;
        else
            return NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> Post(User newUser)
    {
        await _tService.CreateAsync(newUser);
        return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, User updatedUser)
    {
        var user = await _tService.GetAsync(id);
        if (user is null)
            return NotFound();
        updatedUser.Id = user.Id;
        await _tService.UpdateAsync(id, updatedUser);
        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var user = await _tService.GetAsync(id);
        if (user is null)
            return NotFound();
        await _tService.RemoveAsync(id);
        return NoContent();
    }
}