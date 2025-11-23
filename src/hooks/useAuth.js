import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { setUser, setLoading } from '../store/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    uid: user.uid,
                    email: user.email,
                }));
            } else {
                dispatch(setUser(null));
            }
            dispatch(setLoading(false));
        });

        return () => unsubscribe();
    }, [dispatch]);
};
