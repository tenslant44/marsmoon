// Demo scenes for the OpenRBX browser page. Each is plain Lua 5.1 run inside the engine, written
// against the 2007 API (Instance.new, BrickColor, CFrame, Vector3, wait). The same file is loaded
// by the page and by the headless tests, so a scene that works in one works in the other.
(function (root) {
  const HELPERS = `
local ws = game:GetService("Workspace")

local function clearWorld()
  for _, child in ipairs(ws:GetChildren()) do
    if child.className ~= "Camera" then
      child:Remove()
    end
  end
end

local function brick(w, h, d, x, y, z, color, anchored)
  local p = Instance.new("Part")
  p.Size = Vector3.new(w, h, d)
  p.Position = Vector3.new(x, y, z)
  p.BrickColor = BrickColor.new(color)
  p.Anchored = anchored or false
  p.Parent = ws
  return p
end

local function lookAt(from, to)
  local cam = ws.CurrentCamera
  cam.CoordinateFrame = CFrame.new(from, to)
  cam.Focus = CFrame.new(to)
end

clearWorld()
brick(120, 1.2, 120, 0, 0, 0, "Bright green", true)
`;

  const scenes = {
    wall: {
      title: "Brick wall",
      blurb: "A running-bond wall and a ball. Drag with the right mouse button to look around.",
      lua: HELPERS + `
local colors = {"Bright red", "Bright blue", "Bright yellow", "Medium stone grey", "Bright orange", "Br. yellowish green", "Bright violet"}
for row = 0, 7 do
  for col = 0, 4 do
    brick(4, 1.2, 2, (col - 2) * 4.1 + (row % 2) * 2, 1.8 + row * 1.25, 0, colors[(row + col) % #colors + 1])
  end
end
local ball = brick(3, 3, 3, -30, 12, 0, "Really red")
ball.Shape = "Ball"
ball.Velocity = Vector3.new(70, 4, 0)
lookAt(Vector3.new(-8, 11, 34), Vector3.new(0, 5, 0))
print("Brick wall ready.")
`,
    },

    tower: {
      title: "Tilted tower",
      blurb: "Sixteen bricks stacked with a slight drift. Fire a ball at it from the toolbar.",
      lua: HELPERS + `
local colors = {"Bright yellow", "Bright red", "Bright blue", "Earth green", "Bright orange"}
for i = 0, 15 do
  local drift = math.sin(i * 0.9) * 0.45
  brick(6, 1.2, 3, drift, 1.8 + i * 1.25, drift * 0.5, colors[i % #colors + 1])
end
lookAt(Vector3.new(18, 14, 26), Vector3.new(0, 9, 0))
print("Tilted tower ready.")
`,
    },

    rain: {
      title: "Brick rain",
      blurb: "A script drops a new brick every quarter second. Reset or switch scene to stop it.",
      lua: HELPERS + `
local marker = Instance.new("Model")
marker.Name = "RainMarker"
marker.Parent = ws
local colors = {"Bright red", "Bright blue", "Bright yellow", "Medium stone grey", "Bright orange", "Br. yellowish green", "Bright violet", "Earth green"}
lookAt(Vector3.new(0, 16, 38), Vector3.new(0, 4, 0))
local n = 0
while marker.Parent == ws do
  n = n + 1
  local p = brick(math.random(2, 5), 1.2, math.random(2, 4), math.random(-12, 12), 30, math.random(-8, 8), colors[n % #colors + 1])
  p.CFrame = CFrame.new(p.Position) * CFrame.fromEulerAnglesXYZ(0, math.rad(math.random(0, 180)), 0)
  if n > 90 then
    for _, c in ipairs(ws:GetChildren()) do
      if c.className == "Part" and not c.Anchored then c:Remove() break end
    end
  end
  wait(0.25)
end
`,
    },
  };

  // Fires a ball from the camera along its look direction.
  const fireBall = `
local ws = game:GetService("Workspace")
local cf = ws.CurrentCamera.CoordinateFrame
local b = Instance.new("Part")
b.Size = Vector3.new(3, 3, 3)
b.Shape = "Ball"
b.BrickColor = BrickColor.new("Really red")
b.Position = cf.p + cf.lookVector * 6
b.Velocity = cf.lookVector * 80
b.Parent = ws
`;

  // Removes everything in the Workspace except the camera (used before opening a place, because
  // loading adds to the world instead of replacing it).
  const clearWorld = `
local ws = game:GetService("Workspace")
for _, child in ipairs(ws:GetChildren()) do
  if child.className ~= "Camera" then
    child:Remove()
  end
end
`;

  const api = { scenes, fireBall, clearWorld, defaultScene: "wall" };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.OPENRBX_SCENES = api;
})(typeof window !== "undefined" ? window : globalThis);
