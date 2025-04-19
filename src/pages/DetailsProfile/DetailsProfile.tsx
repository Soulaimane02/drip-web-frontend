import React, { useEffect, useState } from "react";
import "./DetailsProfile.css";
import { Check, ExternalLink, Upload, Save, Undo2 } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import { Delete, } from "lucide-react";
import { useNavigate } from "react-router";
import { User } from "../../Models/User";
import { fetchUser } from "../../services/UserService";


const DetailsProfile: React.FC = () => {
    const [companyName, setCompanyName] = useState("Sisyphus Ventures");
    const [user, setUser] = useState<User | null>(null);
    const [name, setName] = useState("sisyphusvc");
    const [firstName, setFirstName] = useState("sisyphusvc");
    const [linkFirstName, setLinkFirstName] = useState("sisyphusvc");
    const [includeReports, setIncludeReports] = useState(true);
    const [includeEmails, setIncludeEmails] = useState(true);
    const navigate = useNavigate(); 
    

    useEffect(() =>{

        const loadToekn = async () =>{
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const fetchUserByToken = await fetchUser(token);
                    setUser(fetchUserByToken as User);  
                } catch (error) {
                    console.error("Erreur lors du décodage du token", error);
                }
            }
            }
            loadToekn();
    })

    return (
        <div className="db_main_container">
            <Navbar />
           
            
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
                           drip.com/{user?.firstName.toLowerCase().replace(/\s+/g, '-')}
                             <ExternalLink size={14} className="dp_external_icon" />
                        </div>
                    </div>
                    <div className="dp_view_profile_container">
                    <Button className="supp-profile-button" onClick={() => {navigate("/")}}>
                        <Delete size={18} className="mr-2" />
                            Supprimer mon Profil
                    </Button>                     
                    </div>
                </div>

                {/* Formulaire principal */}
                <div className="dp_main_content">
                    <div className="dp_section_header">
                        <h2 className="dp_section_title">Votre Profil</h2>
                        <p className="dp_section_description">Mettez à jour vos informations si besoin.</p>
                    </div>
                    <div className="dp_user_info">
                    <div className="dp_user_avatar">
                        <img src={user?.profilePicture} alt="Frankie Sullivan" className="dp_avatar_img" />
                        <div className="dp_user_status"></div>
                    </div>
                    <div className="dp_user_details">
                        <p className="dp_user_name">{user?.lastName} {user?.firstName}</p>
                        <p className="dp_user_email">{user?.email}</p>
                    </div>
                </div>

                    <div className="dp_action_buttons dp_top_action_buttons">
                                <Button className="dp-profile-button" onClick={() => {navigate("/")}}>
                                    <Save size={18} className="mr-2" />
                                        Enregistrer
                                </Button>                        
                                <Button className="dp-profile-button" onClick={() => {navigate("/")}}>
                                    <Undo2 size={18} className="mr-2" />
                                        Annuler
                                </Button>                    
                    </div>

                    {/* Section profil public */}
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
                                <label>Prenom</label>
                                <input
                                    type="text"
                                    className="dp_text_input"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                
                            </div>
                            <div className="dp_input_group dp_url_input_group">
                                <div className="dp_url_prefix">drip.com/</div>
                                <input
                                    type="text"
                                    className="dp_text_input dp_url_input"
                                    value={linkFirstName}
                                    onChange={(e) => setLinkFirstName(e.target.value)}

                                />
                            </div>
                        </div>
                    </div>

                    {/* Logo de l’entreprise */}
                    <div className="dp_form_section">
                        <div className="dp_form_label_container">
                            <label className="dp_form_label">Photo de profil</label>
                            <p className="dp_form_description">
                                Pour Drip une vraie photo, c’est toujours plus sympa !
                            </p>
                        </div>
                        <div className="dp_form_inputs">
                            <div className="dp_logo_upload_container">

                                <div className="dp_upload_area">
                                    <div className="dp_upload_icon">
                                        <Upload size={20} />
                                    </div>
                                    <p className="dp_upload_text">
                                        <span className="dp_upload_link">Cliquez ici pour votre nouvelle photo</span> ou glissez-déposez ici
                                    </p>
                                    <p className="dp_upload_hint">PNG, JPG, JPEF  (max. 10mo)</p>
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
