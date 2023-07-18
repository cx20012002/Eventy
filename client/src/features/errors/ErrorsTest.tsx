import React, {useState} from 'react';
import ValidationError from "./ValidationError";
import axios from "axios";

const buttonStyles = "border border-neutral-400 p-3 w-full rounded hover:text-primary hover:border-primary transition duration-300";

function ErrorsTest() {
    const baseUrl = 'http://localhost:5140/api/'
    const [errors, setErrors] = useState<string[]>([])
    return (
        <section>
            <h1 className={"text-2xl font-bold mb-10"}>Errors for testing purposes</h1>
            <div className={"flex justify-between gap-10"}>
                <button className={buttonStyles} onClick={async () => {
                    await axios.get(baseUrl + 'buggy/bad-request').catch(err => console.log(err.response));
                }}>Test 400 error
                </button>
                <button className={buttonStyles} onClick={async () => {
                    await axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log(err.response));
                }}>Test 401 error
                </button>
                <button className={buttonStyles} onClick={async () => {
                    await axios.get(baseUrl + 'buggy/not-found').catch(err => console.log(err.response));
                }}>Test 404 error
                </button>
                <button className={buttonStyles} onClick={async () => {
                    await axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));
                }}>Test 500 error
                </button>
                <button className={buttonStyles} onClick={async () => {
                    await axios.post(baseUrl + 'activities', {}).catch(err => setErrors(err));
                }}>Test validation error
                </button>
            </div>
            {errors.length > 0 && <ValidationError errors={errors}/>}
        </section>
    )
}

export default ErrorsTest;