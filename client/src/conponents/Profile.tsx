import { useHelloQuery } from "../generated/graphql";

const Profile = () => {
  const { data, loading, error } = useHelloQuery({
    fetchPolicy: "no-cache",
  });
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return <div>{data?.hello}</div>;
};

export default Profile;
