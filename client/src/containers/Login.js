import React, { useSatate, useState } from 'react';
import { Button, FormGroup, FormControl, ControlLabel }from 'react-bootstrap';

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.lengeth > 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
    }
}