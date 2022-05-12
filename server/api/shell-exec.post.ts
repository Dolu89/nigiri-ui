import util from 'util'
import { exec } from "child_process";

const execAsync = util.promisify(exec)

export default defineEventHandler(async (event) => {
    const body = await useBody(event)
    const parsedBody = JSON.parse(body);
    if (!parsedBody.cmd) return null;
    try {
        const { stdout, stderr } = await execAsync(parsedBody.cmd);
        if (stderr) return stderr;
        if (stdout) return stdout;
    } catch (e) {
        console.error(e); // should contain code (exit code) and signal (that caused the termination).
        return e;
    }
})