'use client';
import { saveProfile } from "@/actions/profileInfoActions";
import UploadButton from "@/components/UploadButton";
import { ProfileInfo } from "@/models/ProfileInfo";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

type Props = {
  profileInfo: ProfileInfo | null;
};

export default function ProfileInfoForm({ profileInfo }: Props) {
  const [coverUrl, setCoverUrl] = useState(profileInfo?.coverUrl);
  const [avatarUrl, setAvatarUrl] = useState(profileInfo?.avatarUrl);
  const [username, setUsername] = useState(profileInfo?.username || '');
  const [usernameError, setUsernameError] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate username format
  const validateUsername = (value: string) => {
    if (!value) return 'Username is required';
    if (!/^[a-z0-9_]+$/.test(value)) return 'Only lowercase letters, numbers, and underscores allowed';
    if (value.length < 3) return 'Must be at least 3 characters';
    if (value.length > 20) return 'Must be less than 20 characters';
    return '';
  };

  useEffect(() => {

    if (username === profileInfo?.username || validateUsername(username)) {
      setUsernameError('');
      return;
    }

    const checkUsername = async () => {
      setIsChecking(true);
      try {
        const res = await fetch(
          `/api/check-username?username=${encodeURIComponent(username)}` + 
          `&current=${profileInfo?.username || ''}`
        );
        const { available, error } = await res.json();
        setUsernameError(error || (available ? '' : 'Username is already taken'));
      } catch (error) {
        setUsernameError('Error checking username');
      } finally {
        setIsChecking(false);
      }
    };

    const timer = setTimeout(checkUsername, 500);
    return () => clearTimeout(timer);
  }, [username, profileInfo?.username]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setUsername(value);
    setUsernameError(validateUsername(value));
  };

  async function handleFormAction(formData: FormData) {
    if (usernameError) {
      toast.error('Please fix username errors');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await saveProfile(formData);
      if (result?.success) {
        toast.success('Profile saved!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to save profile');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form action={handleFormAction}>
      {/* Image upload section remains the same */}
      <div className="relative border bg-gray-100 rounded-lg h-48 mb-4">
        <Image
          src={coverUrl || 'https://res.cloudinary.com/deellz8mv/image/upload/v1743098674/c437dc65-3916-4361-a7f6-46b7e64cd8e5_kpqlv6.jpg'}
          alt="cover image"
          width={1024}
          height={1024}
          className="w-full h-48 object-cover object-center rounded-lg"
        />
        <div className="absolute left-4 -bottom-4 z-10 border bg-gray-100 size-24 rounded-lg">
          <div className="rounded-lg size-24 overflow-hidden">
            <Image
              src={avatarUrl || 'https://res.cloudinary.com/deellz8mv/image/upload/v1743096436/icons8-user-96_dhllwv.png'}
              alt="avatar"
              width={120}
              height={120}
            />
          </div>
          <div className="absolute -bottom-2 -right-2">
            <UploadButton onUploadComplete={setAvatarUrl}/>
          </div>
          <input type="hidden" name="avatarUrl" value={avatarUrl || ''}/>
        </div>
        <div className="absolute right-2 bottom-2">
          <UploadButton onUploadComplete={setCoverUrl} />
          <input type="hidden" name="coverUrl" value={coverUrl || ''}/>
        </div>
      </div>

      {/* Username and display name fields */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="input-label" htmlFor="usernameIn">username</label>
          <input
            value={username}
            onChange={handleUsernameChange}
            name="username"
            id="usernameIn"
            type="text"
            placeholder="username"
            required
            pattern="[a-z0-9_]{3,20}"
            title="3-20 characters, lowercase alphanumeric with underscores only"
            disabled={isSubmitting}
          />
          <div className="h-5 mt-1">
            {isChecking ? (
              <span className="text-sm text-gray-500">Checking availability...</span>
            ) : usernameError ? (
              <span className="text-sm text-red-500">{usernameError}</span>
            ) : null}
          </div>
        </div>
        <div>
          <label className="input-label" htmlFor="displayNameIn">display name</label>
          <input
            defaultValue={profileInfo?.displayName}
            name="displayName"
            id="displayNameIn"
            type="text"
            placeholder="display name"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Bio field */}
      <div>
        <label className="input-label" htmlFor="bioIn">bio</label>
        <textarea
          defaultValue={profileInfo?.bio}
          id="bioIn"
          name="bio"
          placeholder="bio"
          disabled={isSubmitting}
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button 
          className="mt-4 bg-yellow-300 px-4 py-2 rounded-lg flex gap-2 items-center disabled:opacity-50"
          type="submit"
          disabled={isSubmitting || !!usernameError}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faSave} />
              Save profile
            </>
          )}
        </button>
        <button
          className="mt-4 bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg flex gap-2 items-center disabled:opacity-50"
          onClick={() => signOut()} 
          type="button"
          disabled={isSubmitting}
        >
          Logout
        </button>
      </div>
    </form>
  );
}