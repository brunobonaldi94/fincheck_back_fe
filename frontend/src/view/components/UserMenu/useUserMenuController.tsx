import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../app/hooks/useAuth";

export function useUserMenuController() {
    const {signout, user} = useAuth();
	const [openProfileModal, setOpenProfileModal] = useState<boolean>(false);
    const [initialsFromName, setInitialsFromName] = useState<string>('');

    const getInitialsFromName = useCallback(() => {
      if (!user) {
          return ''
      }
      const { name } = user;
      const nameAsArray = name.split(' ');
      const firstLetterOfNameUppercased = nameAsArray[0][0].toUpperCase();
      const nameLen = nameAsArray.length
      if (nameLen === 1) {
          return firstLetterOfNameUppercased;
      }
      const firstLetterOfLastNameUppercased = nameAsArray[nameAsArray.length - 1][0].toUpperCase();
      return `${firstLetterOfNameUppercased}${firstLetterOfLastNameUppercased}`
    },[user]);

    useEffect(() => {
        const initialsName = getInitialsFromName();
        setInitialsFromName(initialsName);
    }, [getInitialsFromName])

	const handleCloseProfileModal = useCallback(() => {
		setOpenProfileModal(false);
	},[]);

	const handleOpenProfileModal = useCallback(() => {
		setOpenProfileModal(true);
	},[]);

    return {
        signout,
        initialsFromName,
		openProfileModal,
		handleCloseProfileModal,
		handleOpenProfileModal,
    }
}
