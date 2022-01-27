import React, { useEffect, useState } from 'react';
import { authenticatedChange } from '../../state/features/authenticatedSlice'
import { useAppDispatch, useAppSelector } from '../../state/store/index'
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';

import { useTranslation } from 'react-i18next';
import { signIn } from '../../state/features/authenticatedSlice';
import { ProgressSpinner } from 'primereact/progressspinner';
import './Login.scss'

interface ILogin {
    username: string;
    password: string;
    rememberMe: boolean;
}

export default function Login() {
    const { t } = useTranslation();

    const [formData, setFormData] = useState<ILogin>();
    const [showMessage, setShowMessage] = useState(false);

    const { isAuthenticated, data, loading, error } = useAppSelector((state) => state.authenticated)

    const dispatch = useAppDispatch()
    useEffect(() => {
        if (data) {
            dispatch(authenticatedChange(true))
        }
    }, [loading, data, error])


    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            rememberMe: false
        },
        validate: (data) => {
            let errors = {};

            if (!data.username) {
                errors = { ...errors, username: 'Name is required.' }
            }

            // // if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            // //     errors.email = 'Invalid email address. E.g. example@email.com';
            // // }

            if (!data.password) {
                errors = { ...errors, password: 'Password is required.' }
            }

            return errors;
        },
        onSubmit: data => {
            dispatch(signIn({ username: data.username, password: data.password }))
            setFormData(data);
            setShowMessage(true);
            formik.resetForm();
        }
    });

    const isFormFieldValid = (name: 'username' | 'password' | 'rememberMe') => !!(formik.touched[name] as any && formik.errors[name]);
    const getFormErrorMessage = (name: 'username' | 'password' | 'rememberMe') => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };
    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );


    return <div className="form-demo">
        {loading &&
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
        }
        {
            error &&
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-times-circle" style={{ fontSize: '5rem', color: 'red' }}></i>
                    <h5 style={{color:'red'}}>{error}</h5>
                </div>
            </Dialog>
        }

        {data?.success}

        <div className="flex justify-content-center">
            <div className="card">
                <h5 className="text-center" style={{ fontSize: '25px' }}>Sign In</h5>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="field">
                        <span className="p-float-label">
                            <InputText id="username" name="username" value={formik.values.username} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('username') })} />
                            <label htmlFor="username" className={classNames({ 'p-error': isFormFieldValid('username') })}>Name*</label>
                        </span>
                        {getFormErrorMessage('username')}
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask
                                className={classNames({ 'p-invalid': isFormFieldValid('password') })} header={passwordHeader} footer={passwordFooter} />
                            <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Password*</label>
                        </span>
                        {getFormErrorMessage('password')}
                    </div>
                    <div className="field-checkbox">
                        <Checkbox inputId="rememberMe" name="rememberMe" checked={formik.values.rememberMe} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('rememberMe') })} />
                        <label htmlFor="rememberMe" className={classNames({ 'p-error': isFormFieldValid('rememberMe') })}>Remember Me...</label>
                    </div>

                    <Button type="submit" label={t('BUTTON.Login')} className="mt-2" style={{ marginTop: '10px' }} disabled={loading}/>
                </form>
            </div>
        </div>
    </div>;
}