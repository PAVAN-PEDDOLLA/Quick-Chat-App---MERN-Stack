import { useEffect } from "react";
import { getLoggedUser, getAllUsers } from "../apiCalls/user";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../redux/loaderSlice";
import toast from "react-hot-toast";
import { setAllChats, setAllUsers, setUser } from "../redux/userSlice";
import { getAllChats } from "../apiCalls/chat";

function ProtectedRoute({ children }) {
    const { user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const getLoggedInUser = async () => {
        let response = null;
        try {
            dispatch(showLoader());
            response = await getLoggedUser();
            dispatch(hideLoader());
            if (response.success) {
                dispatch(setUser(response.data));
            } else {
                toast.error(response.message);
                window.location.href = '/login';
            }
        } catch (error) {
            dispatch(hideLoader());
            window.location.href = '/login';
        }
    }

    const getAllUsersFromDb = async () => {
        let response = null;
        try {
            dispatch(showLoader());
            response = await getAllUsers();
            dispatch(hideLoader());
            if (response.success) {
                dispatch(setAllUsers(response.data));
            } else {
                toast.error(response.message);
                window.location.href = '/login';
            }
        } catch (error) {
            dispatch(hideLoader());
            window.location.href = '/login';
        }
    }

    const getCurrentUserChats = async () => {
        let response = null;
        try {
            dispatch(showLoader());
            response = await getAllChats();
            dispatch(hideLoader());
            if (response.success) {
                dispatch(setAllChats(response.data));
            } else {
                toast.error(response.message);
                window.location.href = '/login';
            }
        } catch (error) {
            dispatch(hideLoader());
            window.location.href = '/login';
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            //write Logic for current Login User Details
            getLoggedInUser();
            getAllUsersFromDb();
            getCurrentUserChats();
        } else {
            window.location.href = '/login';
        }
    }, []);
    return (<div>
        {children}
    </div>)
}

export default ProtectedRoute;