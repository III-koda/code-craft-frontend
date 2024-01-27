import axois from 'axios';

const CODE_EXE_API_URL = 'https://code-craft-grso.onrender.com/execute'

class CodeExecutionResult {
    constructor(stdout, stderr, exitCode) {
        this.#stdout = stdout;
        this.#stderr = stderr;
        this.#exitCode = exitCode;
    }

    get stdout() { return this.#stdout; }
    get stderr() { return this.#stderr; }
    get exitCode() { return this.#exitCode; }

    #stdout
    #stderr
    #exitCode
}

const executeCode = async (language, code) => {
    try {
        const conf = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };
        const formData = new FormData();
        formData.append('language', language);
        formData.append('code', code);

        const response = await axois.post(CODE_EXE_API_URL, formData, conf);
        if (response.status != 200 || !response.data.success) {
            console.log(response)
            return null;
        }
        const data = response.data.data;
        const result = new CodeExecutionResult(
            data.stdout,
            data.stderr,
            data.exit_code
        );
        return result;
    } catch (error) {
        console.log(`ERRORL: ${error}`)
        return null;
    }
};

export { CodeExecutionResult, executeCode };
