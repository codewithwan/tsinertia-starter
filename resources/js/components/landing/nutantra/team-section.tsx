import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Crown, Code, Palette, GraduationCap } from 'lucide-react';

interface TeamMember {
    name: string;
    role: string;
    image: string;
    icon: React.ElementType;
    social: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        email?: string;
    };
}

const teamMembers: TeamMember[] = [
    {
        name: 'Warseno Bambang Setyono',
        role: 'Ketua Tim',
        image: '/assets/avatar/boy1.png',
        icon: Crown,
        social: {
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            email: 'warseno@nutantra.life',
        },
    },
    {
        name: 'Muhammad Ridwan',
        role: 'Kroco',
        image: '/assets/avatar/boy2.png',
        icon: Code,
        social: {
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            email: 'ridwan@nutantra.life',
        },
    },
    {
        name: 'Irine Luthfia Dani',
        role: 'Designer',
        image: '/assets/avatar/girl1.png',
        icon: Palette,
        social: {
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            email: 'irine@nutantra.life',
        },
    },
    {
        name: 'Muttabik Fathul Lathief, S.Kom., M.Eng',
        role: 'Pembimbing',
        image: '/assets/avatar/boy3.png',
        icon: GraduationCap,
        social: {
            linkedin: 'https://linkedin.com',
            email: 'muttabik@nutantra.life',
        },
    },
];

export default function TeamSection() {
    return (
        <section className="py-24 sm:py-32 px-4 sm:px-6 bg-muted/30">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16 sm:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-black mb-6"
                    >
                        Tim{' '}
                        <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                            Kami
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium"
                    >
                        Orang-orang di balik teknologi AI yang mengubah cara kita tracking nutrisi
                    </motion.p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group text-center"
                        >
                            {/* Member Card - Green Gradient */}
                            <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-white overflow-hidden">
                                {/* Decorative Background Pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                                </div>

                                {/* Role Icon */}
                                <div className="relative mb-4">
                                    <div className="w-12 h-12 mx-auto rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <member.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>

                                {/* Profile Image */}
                                <div className="relative mb-4">
                                    <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden border-2 border-white/30 group-hover:border-white/50 transition-colors">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 scale-x-[-1]"
                                        />
                                    </div>
                                </div>

                                {/* Member Info */}
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-green-100 transition-colors">
                                        {member.name}
                                    </h3>
                                    
                                    <p className="text-green-100 mb-6 font-medium">
                                        {member.role}
                                    </p>

                                    {/* Social Links */}
                                    <div className="flex justify-center gap-3">
                                        {member.social.github && (
                                            <a
                                                href={member.social.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-all flex items-center justify-center group/link backdrop-blur-sm"
                                            >
                                                <Github className="h-5 w-5 group-hover/link:scale-110 transition-transform" />
                                            </a>
                                        )}
                                        {member.social.linkedin && (
                                            <a
                                                href={member.social.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-all flex items-center justify-center group/link backdrop-blur-sm"
                                            >
                                                <Linkedin className="h-5 w-5 group-hover/link:scale-110 transition-transform" />
                                            </a>
                                        )}
                                        {member.social.twitter && (
                                            <a
                                                href={member.social.twitter}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-all flex items-center justify-center group/link backdrop-blur-sm"
                                            >
                                                <Twitter className="h-5 w-5 group-hover/link:scale-110 transition-transform" />
                                            </a>
                                        )}
                                        {member.social.email && (
                                            <a
                                                href={`mailto:${member.social.email}`}
                                                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-all flex items-center justify-center group/link backdrop-blur-sm"
                                            >
                                                <Mail className="h-5 w-5 group-hover/link:scale-110 transition-transform" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}