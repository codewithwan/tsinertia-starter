import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { FormEventHandler, useRef, useState, useEffect } from 'react';
import { Camera, AlertCircle } from 'lucide-react';

import { AvatarCropper } from '@/components/avatar-cropper';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { route } from 'ziggy-js';
import { Alert, AlertDescription } from '@/components/ui/alert';

function PasswordForm({ isDemo }: { isDemo: boolean }) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();
        if (isDemo) return;

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <form onSubmit={updatePassword} className="space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="current_password">Current password</Label>
                <Input
                    id="current_password"
                    ref={currentPasswordInput}
                    value={data.current_password}
                    onChange={(e) => setData('current_password', e.target.value)}
                    type="password"
                    className="mt-1 block w-full"
                    autoComplete="current-password"
                    placeholder="Current password"
                    disabled={isDemo}
                />
                <InputError message={errors.current_password} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="password">New password</Label>
                <Input
                    id="password"
                    ref={passwordInput}
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    type="password"
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    placeholder="New password"
                    disabled={isDemo}
                />
                <InputError message={errors.password} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="password_confirmation">Confirm password</Label>
                <Input
                    id="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    type="password"
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    placeholder="Confirm password"
                    disabled={isDemo}
                />
                <InputError message={errors.password_confirmation} />
            </div>

            <div className="flex items-center gap-4">
                <Button disabled={processing || isDemo}>Save password</Button>
                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-neutral-600">Saved</p>
                </Transition>
            </div>
        </form>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

type ProfileForm = {
    name: string;
    email: string;
    avatar: File | null;
};

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth, isDemo } = usePage<SharedData>().props;
    const getInitials = useInitials();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(auth.user.avatar || null);
    const [showCropper, setShowCropper] = useState(false);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);

    const { data, setData, errors } = useForm<ProfileForm>({
        name: auth.user.name,
        email: auth.user.email,
        avatar: null,
    });

    useEffect(() => {
        if (!data.avatar && auth.user.avatar) {
            setAvatarPreview(auth.user.avatar);
        } else if (!data.avatar && !auth.user.avatar) {
            setAvatarPreview(null);
        }
    }, [auth.user.avatar, data.avatar]);

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
        setData('avatar', croppedFile);
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


    const nameForm = useForm({ name: auth.user.name });
    const emailForm = useForm({ email: auth.user.email });

    const submitName: FormEventHandler = (e) => {
        e.preventDefault();
        if (isDemo) return;
        nameForm.patch(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                router.reload({ only: ['auth'] });
            },
        });
    };

    const submitEmail: FormEventHandler = (e) => {
        e.preventDefault();
        if (isDemo) return;
        emailForm.patch(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                router.reload({ only: ['auth'] });
            },
        });
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    {isDemo && (
                        <Alert className="border-amber-500/50 bg-amber-500/10">
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                            <AlertDescription className="text-amber-600 dark:text-amber-400">
                                Profile editing is disabled in demo mode. Changes cannot be saved.
                            </AlertDescription>
                        </Alert>
                    )}
                    {/* Profile Photo Card */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Profile Photo</CardTitle>
                                    <CardDescription>Update your profile picture</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage
                                            src={avatarPreview || auth.user.avatar || undefined}
                                            alt={auth.user.name}
                                        />
                                        <AvatarFallback className="bg-primary/10 text-primary text-lg">
                                            {getInitials(auth.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-medium">Profile Picture</p>
                                        <p className="text-xs text-muted-foreground">
                                            JPG, PNG or GIF. Max size of 2MB.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        disabled={isDemo}
                                        onClick={() => {
                                            if (fileInputRef.current) {
                                                fileInputRef.current.value = '';
                                                fileInputRef.current.click();
                                            }
                                        }}
                                    >
                                        <Camera className="mr-2 h-4 w-4" />
                                        {data.avatar || auth.user.avatar ? 'Change' : 'Upload'}
                                    </Button>
                                    {data.avatar && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setData('avatar', null);
                                                setAvatarPreview(auth.user.avatar || null);
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = '';
                                                }
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/jpg,image/gif"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                </div>
                            </div>
                            <InputError className="mt-2" message={errors.avatar} />
                        </CardContent>
                    </Card>

                    {/* Name Card */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Name</CardTitle>
                                    <CardDescription>Update your display name</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submitName} className="flex items-center justify-between gap-4">
                                <div className="flex-1">
                                    <Input
                                        id="name"
                                        value={nameForm.data.name}
                                        onChange={(e) => nameForm.setData('name', e.target.value)}
                                        autoComplete="name"
                                        placeholder="Full name"
                                        className="w-full"
                                        disabled={isDemo}
                                    />
                                    <InputError className="mt-2" message={nameForm.errors.name} />
                                </div>
                                <Button type="submit" disabled={nameForm.processing || nameForm.data.name === auth.user.name || isDemo}>
                                    Save
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Email Card */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Email Address</CardTitle>
                                    <CardDescription>Update your email address</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submitEmail} className="flex items-center justify-between gap-4">
                                <div className="flex-1">
                                    <Input
                                        id="email"
                                        type="email"
                                        value={emailForm.data.email}
                                        onChange={(e) => emailForm.setData('email', e.target.value)}
                                        autoComplete="username"
                                        placeholder="Email address"
                                        className="w-full"
                                        disabled={isDemo}
                                    />
                                    <InputError className="mt-2" message={emailForm.errors.email} />
                                    {mustVerifyEmail && auth.user.email_verified_at === null && (
                                        <p className="mt-2 text-xs text-muted-foreground">
                                            Your email address is unverified.{' '}
                                            <Link
                                                href={route('verification.send')}
                                                method="post"
                                                as="button"
                                                className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                            >
                                                Click here to send verification code.
                                            </Link>
                                        </p>
                                    )}
                                    {status === 'verification-otp-sent' && (
                                        <div className="mt-2 text-xs font-medium text-green-600">
                                            A verification code has been sent to your email address.
                                        </div>
                                    )}
                                </div>
                                <Button type="submit" disabled={emailForm.processing || emailForm.data.email === auth.user.email || isDemo}>
                                    Save
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Password Card */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Update Password</CardTitle>
                                    <CardDescription>Ensure your account is using a long, random password to stay secure</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <PasswordForm isDemo={isDemo} />
                        </CardContent>
                    </Card>
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
