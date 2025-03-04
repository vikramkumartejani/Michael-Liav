import profile from "@/data/profile.json";

export default function Profile() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">{profile.name}</h1>
      <p className="text-gray-600">{profile.bio}</p>
      <div className="mt-4">
        <a href={profile.socials.linkedin} className="text-blue-500">LinkedIn</a> |
        <a href={profile.socials.medium} className="text-blue-500 mx-2">Medium</a> |
        <a href={profile.socials.github} className="text-blue-500">GitHub</a>
      </div>
    </div>
  );
}
