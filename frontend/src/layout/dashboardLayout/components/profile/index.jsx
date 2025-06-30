import { Link } from "react-router-dom";
import ROUTES from "../../../../constants/routes";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../../../api/auth";

export const Profile = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getMe,
  });

  console.log("Data ", data);
  const user = data?.user;

  console.log("User ", user);

  return (
    <Link
      to={ROUTES.PROFILE_SETTINGS}
      className="flex items-center gap-2 divide-neutral-200 dark:divide-neutral-800 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
    >
      <Avatar name={user?.name} imgUrl={user?.imgUrl} />
      <div className=" flex-col justify-center hidden md:flex">
        <p className="text-[12px] leading-[12px]  font-medium text-primary-text">
          {user?.name}
        </p>
        <p className="text-xs text-secondary-text">{user?.email}</p>
      </div>
    </Link>
  );
};

export const Avatar = ({ name, imgUrl }) => {
  return (
    <>
      {!imgUrl ? (
        <div className="flex items-center justify-center bg-pink-600 text-white rounded-full size-8 text-sm font-medium">
          {name?.split(" ")?.[0]?.[0]}
        </div>
      ) : (
        <div className="size-8 rounded-full overflow-hidden">
          <img
            src={imgUrl}
            alt={name || "User avatar"}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error("Image failed to load:", e);
              e.target.style.display = "none";
            }}
          />
        </div>
      )}
    </>
  );
};
