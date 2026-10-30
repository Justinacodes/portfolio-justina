// Start the Python chat server with the project venv when there is one.
// A bare `python` can resolve to the Windows Store stub, which exits with
// "Python was not found" and leaves /api/chat failing with ECONNREFUSED.
const { spawn } = require("child_process")
const fs = require("fs")
const path = require("path")

const aiDir = path.join(__dirname, "..", "app", "ai")
const candidates = [
  path.join(aiDir, "venv", "Scripts", "python.exe"),
  path.join(aiDir, "venv", "bin", "python"),
]
const python = candidates.find((p) => fs.existsSync(p)) ?? "python"

const child = spawn(
  python,
  ["-m", "uvicorn", "server:app", "--reload", "--host", "0.0.0.0", "--port", "8000"],
  { cwd: aiDir, stdio: "inherit" }
)
child.on("error", (err) => {
  console.error(`[dev:ai] Failed to start ${python}:`, err.message)
  process.exit(1)
})
child.on("exit", (code) => process.exit(code ?? 0))
