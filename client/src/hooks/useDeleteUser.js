import { useUserContext } from "./useUserContext";

export const useDeleteUser = () => {
  const { user } = useUserContext();

  const deleteUser = async () => {
    // Delete user posts
    await fetch(`/api/blog/${user.username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    // Delete user comments
    await fetch(`/api/comment/user/${user.username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    // Delete user
    await fetch(`/api/user/${user.username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
  };
  return { deleteUser };
};
