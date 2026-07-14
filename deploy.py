import subprocess
import sys

def run(cmd):
    print(f"--- Running: {cmd} ---")
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if result.stdout:
        print(result.stdout)
    if result.stderr:
        print(result.stderr)
    return result.returncode

print("Staging files...")
run("git add .")

print("Committing changes...")
run("git commit -m \"Update product catalog: add new rice images, update prices, and streamline mangoes\"")

print("Pushing to remote...")
push_res = run("git push")

# Try to run vercel if available
print("Attempting Vercel deployment...")
vercel_res = run("npx vercel --prod --yes")

if vercel_res != 0:
    print("Vercel CLI deployment failed or not found. If this repository is linked to Vercel on GitHub, the push above will automatically trigger a deployment.")

