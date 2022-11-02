import { useGetAllUsersQuery } from "../generated/graphql";

const Home = () => {
  const { data, loading, error } = useGetAllUsersQuery();
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <ul>
      {data?.users.map((user) => (
        <li key={user.id}>{user.username}</li>
      ))}
    </ul>
  );
};

export default Home;
