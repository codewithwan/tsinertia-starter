import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { FormEventHandler, useRef, useState, useEffect } from 'react';
import { Camera } from 'lucide-react';

import { AvatarCropper } from '@/components/avatar-cropper';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Account settings',
        href: '/settings/account',
    },
];

type ProfileForm = {
    name: string;
    email: string;
    avatar: File | null;
};

type PasswordForm = {
    current_password: string;
    password: string;
    password_confirmation: string;
};

export default function Account({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(auth.user.avatar || null);
    const [showCropper, setShowCropper] = useState(false);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);

    // Profile form
    const profileForm = useForm<ProfileForm>({
        name: auth.user.name,
        email: auth.user.email,
        avatar: null,
    });

    // Password form
    const passwordForm = useForm<PasswordForm>({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        if (!profileForm.data.avatar && auth.user.avatar) {
            setAvatarPreview(auth.user.avatar);
        } else if (!profileForm.data.avatar && !auth.user.avatar) {
            setAvatarPreview(null);
        }
    }, [auth.user.avatar, profileForm.data.avatar]);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                setImageToCrop(imageUrl);
                setShowCropper(true);
            };
            reader.readAsDataURL(file);
        } else {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleCropComplete = (croppedFile: File) => {
        profileForm.setData('avatar', croppedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result as string);
        };
        reader.readAsDataURL(croppedFile);
        setShowCropper(false);
        setImageToCrop(null);
    };

    const handleCloseCropper = () => {
        setShowCropper(false);
        setImageToCrop(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const submitProfile: FormEventHandler = (e) => {
        e.preventDefault();

        if (!profileForm.data.avatar) {
            profileForm.patch(route('profile.update'), {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload({ only: ['auth'] });
                },
            });
            return;
        }

        router.post(route('profile.update'), {
            _method: 'PATCH',
            name: profileForm.data.name,
            email: profileForm.data.email,
            avatar: profileForm.data.avatar,
        }, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                profileForm.setData('avatar', null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                router.reload({
                    only: ['auth']
                });
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            },
        });
    };

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        passwordForm.put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
            onError: (errors) => {
                if (errors.password) {
                    passwordForm.reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    passwordForm.reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Account settings" />

            <SettingsLayout>
                <div className="space-y-8">
                    {/* Profile Information Section */}
                    <div className="space-y-6">
                        <HeadingSmall title="Profile information" description="Update your name, email address, and profile photo" />

                        <form onSubmit={submitProfile} className="space-y-6" encType="multipart/form-data">
                            {/* Avatar Upload */}
                            <div className="grid gap-2">
                                <Label>Profile Photo</Label>
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage
                                            src={avatarPreview || auth.user.avatar || undefined}
                                            alt={auth.user.name}
                                        />
                                        <AvatarFallback className="bg-primary/10 text-primary text-lg">
                                            {getInitials(auth.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = '';
                                                    fileInputRef.current.click();
                                                }
                                            }}
                                        >
                                            <Camera className="mr-2 h-4 w-4" />
                                            {profileForm.data.avatar || auth.user.avatar ? 'Change Photo' : 'Upload Photo'}
                                        </Button>
                                        {profileForm.data.avatar && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    profileForm.setData('avatar', null);
                                                    setAvatarPreview(auth.user.avatar || null);
                                                    if (fileInputRef.current) {
                                                        fileInputRef.current.value = '';
                                                    }
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                        <p className="text-xs text-muted-foreground">
                                            JPG, PNG or GIF. Max size of 2MB.
                                        </p>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/jpg,image/gif"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                </div>
                                <InputError className="mt-2" message={profileForm.errors.avatar} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={profileForm.data.name}
                                    onChange={(e) => profileForm.setData('name', e.target.value)}
                                    autoComplete="name"
                                    placeholder="Full name"
                                />
                                <InputError className="mt-2" message={profileForm.errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={profileForm.data.email}
                                    onChange={(e) => profileForm.setData('email', e.target.value)}
                                    autoComplete="username"
                                    placeholder="Email address"
                                />
                                <InputError className="mt-2" message={profileForm.errors.email} />
                            </div>

                            {mustVerifyEmail && auth.user.email_verified_at === null && (
                                <div>
                                    <p className="-mt-4 text-sm text-muted-foreground">
                                        Your email address is unverified.{' '}
                                        <Link
                                            href={route('verification.send')}
                                            method="post"
                                            as="button"
                                            className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                        >
                                            Click here to resend the verification email.
                                        </Link>
                                    </p>

                                    {status === 'verification-link-sent' && (
                                        <div className="mt-2 text-sm font-medium text-green-600">
                                            A new verification link has been sent to your email address.
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <Button disabled={profileForm.processing}>Save</Button>

                                <Transition
                                    show={profileForm.recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-neutral-600">Saved</p>
                                </Transition>
                            </div>
                        </form>
                    </div>

                    <Separator />

                    {/* Change Password Section */}
                    <div className="space-y-6">
                        <HeadingSmall title="Change password" description="Ensure your account is using a long, random password to stay secure" />

                        <form onSubmit={updatePassword} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="current_password">Current password</Label>
                                <Input
                                    id="current_password"
                                    ref={currentPasswordInput}
                                    value={passwordForm.data.current_password}
                                    onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                    type="password"
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    placeholder="Current password"
                                />
                                <InputError message={passwordForm.errors.current_password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">New password</Label>
                                <Input
                                    id="password"
                                    ref={passwordInput}
                                    value={passwordForm.data.password}
                                    onChange={(e) => passwordForm.setData('password', e.target.value)}
                                    type="password"
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    placeholder="New password"
                                />
                                <InputError message={passwordForm.errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">Confirm password</Label>
                                <Input
                                    id="password_confirmation"
                                    value={passwordForm.data.password_confirmation}
                                    onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                    type="password"
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    placeholder="Confirm password"
                                />
                                <InputError message={passwordForm.errors.password_confirmation} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={passwordForm.processing}>Update password</Button>

                                <Transition
                                    show={passwordForm.recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-neutral-600">Saved</p>
                                </Transition>
                            </div>
                        </form>
                    </div>
                </div>
            </SettingsLayout>

            {imageToCrop && (
                <AvatarCropper
                    imageSrc={imageToCrop}
                    open={showCropper}
                    onClose={handleCloseCropper}
                    onCropComplete={handleCropComplete}
                />
            )}
        </AppLayout>
    );
}
