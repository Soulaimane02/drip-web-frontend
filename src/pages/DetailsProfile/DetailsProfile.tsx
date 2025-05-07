import React, { useEffect, useState } from "react";
import "./DetailsProfile.css";
import { Check, ExternalLink, Upload, Save, Undo2 } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import { Delete } from "lucide-react";
import { useNavigate } from "react-router";
import { User } from "../../Models/User";
import { fetchUser, uptadeUser, deleteUser } from "../../services/UserService";
import { toast } from "sonner";

const DetailsProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    

    useEffect(() => {
        const loadToken = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const fetchedUser = await fetchUser(token);
                    if (typeof fetchedUser !== "string") {
                        setUser(fetchedUser as User);
                        setName(fetchedUser.lastName);
                        setFirstName(fetchedUser.firstName);
                    }
                } catch (error) {
                    console.error("Erreur lors du décodage du token", error);
                }
            }
        };
        loadToken();
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const imageUrl = URL.createObjectURL(file);
            setUser((prev) => prev ? { ...prev, profilePicture: imageUrl } : null);
        }
    };

    const handleUpdate = async () => {
        if (firstName.trim() === "" || name.trim() === "") {
            toast.error("Vous ne pouvez pas laisser à vide !");
            return;
        }        if (user && user.id) {
            const formData = new FormData();
            formData.append("email", user.email);
            formData.append("firstName", firstName);
            formData.append("lastName", name);
            if (selectedFile) {
                formData.append("profilePicture", selectedFile);
            }

            const updatedUser = await uptadeUser(user.id, formData, true);
            if (updatedUser && updatedUser !== "Internal server error") {
                navigate("/");
            } else {
                console.error("Erreur lors de la mise à jour du profil.");
            }
        }
    };

    const handleDelete = async () => {
        if (user && user.id) {
            const result = await deleteUser(user.id);
            if (!result) {
                navigate("/login");
            }
        }
    };


    return (
        <div className="db_main_container">
            <Navbar user={user}  showSearch={false} />
            <div className="dp_profile_container">
                <div className="dp_header_section">
                    <div className="dp_logo_container">
                        <div className="dp_logo_circle">
                            <img
                                src={user?.profilePicture}
                                alt="image_profile"
                                className="dp_logo_image"
                            />
                        </div>
                        <div className="dp_verified_badge">
                            <Check size={16} color="white" />
                        </div>
                    </div>
                    <div className="dp_company_header">
                        <h1 className="dp_company_name">{user?.lastName} {user?.firstName}</h1>
                        <div className="dp_company_url">
                        {user?.role === "Seller" && (
                            <>
                           <span>
                            drip.com/{`seller/${user.firstName.toLowerCase().replace(/\s+/g, '-')}/${user.id}`}
                            </span>
                            <ExternalLink size={14} className="dp_external_icon" />
                            </>
                        )}

                        </div>
                    </div>
                    <div className="dp_view_profile_container">
                    <Button
                    className="supp-profile-button"
                    onClick={async () => {
                        const confirmDelete = window.confirm(
                        "⚠️ Es-tu sûr de vouloir supprimer ton profil ? Cette action est irréversible."
                        );
                        if (confirmDelete && user && user.id) {
                        const result = await deleteUser(user.id);
                        if (!result) {
                            navigate("/login");
                        }
                        }
                    }}
                    >
                    <Delete size={18} className="mr-2" />
                    Supprimer mon Profil
                    </Button>
                     
                    </div>
                </div>

                <div className="dp_main_content">
                    <div className="dp_section_header">
                        <h2 className="dp_section_title">Votre Profil</h2>
                        <p className="dp_section_description">Mettez à jour vos informations si besoin.</p>
                    </div>

                    <div className="dp_user_info">
                        <div className="dp_user_avatar">
                            <img src={user?.profilePicture} alt="avatar" className="dp_avatar_img" />
                            <div className="dp_user_status"></div>
                        </div>
                        <div className="dp_user_details">
                            <p className="dp_user_name">{user?.lastName} {user?.firstName}</p>
                            <p className="dp_user_email">{user?.email}</p>
                        </div>
                    </div>

                    <div className="dp_action_buttons dp_top_action_buttons">
                        <Button className="dp-profile-button" onClick={handleUpdate}>
                            <Save size={18} className="mr-2" />
                            Enregistrer
                        </Button>                        
                        <Button className="dp-profile-button" onClick={() => { navigate("/") }}>
                            <Undo2 size={18} className="mr-2" />
                            Annuler
                        </Button>                    
                    </div>

                    <div className="dp_form_section">
                        <div className="dp_form_label_container">
                            <label className="dp_form_label">Changer mon Profil</label>
                            <p className="dp_form_description">Modifier vos informations en toute sécurité sur Drip.</p>
                        </div>
                        <div className="dp_form_inputs">
                            <div className="dp_input_group">
                                <label> Nom</label>
                                <input
                                    type="text"
                                    className="dp_text_input"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="dp_input_group">
                                <label>Prénom</label>
                                <input
                                    type="text"
                                    className="dp_text_input"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="dp_input_group dp_url_input_group">
                                {user?.role === "Seller" &&(
                                    <>
                                       <div className="dp_url_prefix">drip.com/</div>
                                        <span className="dp_text_input dp_url_input">{firstName?.toLowerCase().replace(/\s+/g, '-')}/{user.id}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="dp_form_section">
                        <div className="dp_form_label_container">
                            <label className="dp_form_label">Photo de profil</label>
                            <p className="dp_form_description">
                                Une vraie photo, c’est toujours plus sympa ! Elle aide à rassurer les acheteurs et à créer une vraie connexion.
                            </p>
                        </div>
                        <div className="dp_form_inputs">
                            <div className="dp_logo_upload_container">
                                <div className="dp_upload_area">
                                    <label htmlFor="profile-upload" className="dp_upload_icon" style={{ cursor: "pointer" }}>
                                        <Upload size={20} />
                                    </label>
                                    <input
                                        id="profile-upload"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        onChange={handleFileChange}
                                    />
                                    <p className="dp_upload_text">
                                        <span className="dp_upload_link">Cliquez ici pour votre nouvelle photo</span> ou glissez-déposez ici
                                    </p>
                                    <p className="dp_upload_hint">PNG, JPG, JPEG (max. 10mo)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DetailsProfile;
