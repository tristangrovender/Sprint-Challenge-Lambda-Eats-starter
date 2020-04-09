import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

// form schema
const formSchema = yup.object().shape({
    name: yup
        .string()
        .min(2)
        .required("Name is required and must be at least 2 characters"),
    sizeDropdown: yup.string().required(),
    pepperoni: yup.string(),
    sausage: yup.string(),
    mushroom: yup.string(),
    olives: yup.string(),
    instructions: yup.string()
});

export default function Form() {
    const [formState, setFormState] = useState({
        name: "",
        sizeDropdown: "",
        pepperoni: "",
        sausage: "",
        mushroom: "",
        olives: "",
        instructions: ""
    });

    // error state goes here
    const [errors, setErrors] = useState({
        name: "",
        sizeDropdown: "",
        pepperoni: "",
        sausage: "",
        mushroom: "",
        olives: "",
        instructions: ""
    });

    // slice of button state
    const [buttonDisabled, setButtonDisabled] = useState(true);

    // slice of user state
    const [user, setUser] = useState([]);

    // When formState changes
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    // validateChange
    const validateChange = e => {
        // .reach let's us reach into a nested schema
        yup.reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                });
            });
    };

    // onSubmit function
    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                setUser(res.data);
                console.log("Success", user);

                setFormState({
                    name: "",
                    sizeDropdown: "",
                    pepperoni: "",
                    sausage: "",
                    mushroom: "",
                    olives: "",
                    instructions: ""
                });
            })
            .catch(err => {
                console.log(err.res);
            });
    };

    // onChange function
    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
                e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newFormData);
    };

    return (
        <div className="form">
            <form onSubmit={formSubmit}>
                <label htmlFor="name">
                    Name:
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={inputChange}
                    />
                </label>
                <br />
                <label htmlFor="sizeDropdown">
                    Select a size:
                    <select
                        id="sizeDropdown"
                        name="sizeDropdown"
                        onChange={inputChange}
                    >
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="Family size">Family size</option>
                    </select>
                </label>
                <br />
                <label htmlFor="pepperoni" className="pepperoni">
                    Topping choices:
                    <br />
                    <input
                        type="checkbox"
                        name="pepperoni"
                        checked={formState.pepperoni}
                        onChange={inputChange}
                    />
                    Pepperoni
                </label>
                <label htmlFor="sausage" className="sausage">
                    <input
                        type="checkbox"
                        name="sausage"
                        checked={formState.sausage}
                        onChange={inputChange}
                    />
                    Sausage
                </label>
                <label htmlFor="mushroom" className="mushroom">
                    <input
                        type="checkbox"
                        name="mushroom"
                        checked={formState.mushroom}
                        onChange={inputChange}
                    />
                    Mushroom
                </label>
                <label htmlFor="olives" className="olives">
                    <input
                        type="checkbox"
                        name="olives"
                        checked={formState.olives}
                        onChange={inputChange}
                    />
                    Olives
                </label>
                <br />
                <label htmlFor="instructions">
                    Special instructions:
                    <br />
                    <textarea
                        id="instructions"
                        name="instructions"
                        value={formState.instructions}
                        onChange={inputChange}
                    />
                </label>
                <br />
                <button disabled={buttonDisabled}>Submit</button>
                <pre>{JSON.stringify(user, null, 2)}</pre>
            </form>
        </div>
    );
}
