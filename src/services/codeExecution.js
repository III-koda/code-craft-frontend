import axois from "axios";

const CODE_EXE_API_URL = "https://code-craft-grso.onrender.com/execute";

class CodeExecutionResult {
  constructor(stdout, stderr, exitCode, timeout) {
    this.#stdout = stdout;
    this.#stderr = stderr;
    this.#exitCode = exitCode;
    this.#timeout = timeout;
  }

  get stdout() {
    return this.#stdout;
  }
  get stderr() {
    return this.#stderr;
  }
  get exitCode() {
    return this.#exitCode;
  }
  get timeout() {
    return this.#timeout;
  }

  #stdout;
  #stderr;
  #exitCode;
  #timeout;
}

const executeCode = async (language, code) => {
  try {
    const conf = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const formData = new FormData();
    formData.append("language", language);
    formData.append("code", code);

    const response = await axois.post(CODE_EXE_API_URL, formData, conf);
    if (response.status !== 200) {
      console.log(response);
      return null;
    }
    const data = response.data.data;
    const timeout = response.data.time_out;
    if (timeout) {
      return new CodeExecutionResult(null, null, null, true);
    }
    return new CodeExecutionResult(
      data.stdout,
      data.stderr,
      data.exit_code,
      data.timeout
    );
  } catch (error) {
    console.log(`ERRORL: ${error}`);
    return null;
  }
};

export { CodeExecutionResult, executeCode };
