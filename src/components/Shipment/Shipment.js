import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => console.log(data);

    return (
        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>

            <input defaultValue={loggedInUser.name} {...register("name")} />

            <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="email"/>
            {errors.email && <span className='error'>email is required</span>}

            <input {...register("phone", { required: true })} placeholder="phone"/>
            {errors.phone && <span className='error'>phone number is required</span>}

            <input {...register("address", { required: true })} placeholder="address"/>
            {errors.address && <span className='error'>address is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;