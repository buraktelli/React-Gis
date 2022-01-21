import React, { useEffect } from 'react';
import { authenticatedChange } from '../../state/features/authenticatedSlice'
import { useAppDispatch, useAppSelector } from '../../state/store/index'
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import { signIn } from '../../state/features/authenticatedSlice';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function Login() {
    const { t } = useTranslation();

    const { isAuthenticated, data, loading, error } = useAppSelector((state) => state.authenticated)
    const dispatch = useAppDispatch()
    const onClickSignIn = () => {
        dispatch(signIn())
    }
    useEffect(() => {
        if (data) {
            dispatch(authenticatedChange(true))
        }
    }, [loading, data, error])


    return <div>
        {loading &&
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />}
        {error && error}
        {data?.success}
        <Button
            onClick={onClickSignIn}
            label={
                t('BUTTON.Login')
            }
            style={{
                marginLeft: '5px',
                backgroundColor: '#2a2c38',
                width: '115px',
                height: '45px',
                display: 'flex',
                justifyContent: 'center'
            }}
        />
    </div>;
}
