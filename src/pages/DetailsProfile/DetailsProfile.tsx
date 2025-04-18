import React, { useEffect, useState } from "react";
import "./DetailsProfile.css";
import { Check, ExternalLink, Upload } from "lucide-react";
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
    const [twitterHandle, setTwitterHandle] = useState("sisyphusvc");
    const [facebookHandle, setFacebookHandle] = useState("sisyphusvc");
    const [linkedinHandle, setLinkedinHandle] = useState("sisyphusvc");
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

                    <div className="dp_action_buttons dp_top_action_buttons">
                                <Button className="dp-profile-button" onClick={() => {navigate("/")}}>
                                    <Delete size={18} className="mr-2" />
                                        Enregistrer
                                </Button>                        
                                <Button className="dp-profile-button" onClick={() => {navigate("/")}}>
                                    <Delete size={18} className="mr-2" />
                                        Annuler
                                </Button>                    
                    </div>

                    {/* Section profil public */}
                    <div className="dp_form_section">
                        <div className="dp_form_label_container">
                            <label className="dp_form_label">Profil public</label>
                            <p className="dp_form_description">Ces informations apparaîtront sur votre profil public.</p>
                        </div>
                        <div className="dp_form_inputs">
                            <div className="dp_input_group">
                                <input
                                    type="text"
                                    className="dp_text_input"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                            </div>
                            <div className="dp_input_group dp_url_input_group">
                                <div className="dp_url_prefix">drip.com/</div>
                                <input
                                    type="text"
                                    className="dp_text_input dp_url_input"
                                    value={user?.lastName}

                                />
                            </div>
                        </div>
                    </div>

                    {/* Logo de l’entreprise */}
                    <div className="dp_form_section">
                        <div className="dp_form_label_container">
                            <label className="dp_form_label">Logo de l'entreprise</label>
                            <p className="dp_form_description">Ajoutez ou modifiez le logo de votre entreprise.</p>
                        </div>
                        <div className="dp_form_inputs">
                            <div className="dp_logo_upload_container">
                                <div className="dp_logo_preview">
                                    <div className="dp_logo_circle dp_logo_preview_circle">
                                        <div className="dp_logo_pattern"></div>
                                    </div>
                                </div>
                                <div className="dp_upload_area">
                                    <div className="dp_upload_icon">
                                        <Upload size={20} />
                                    </div>
                                    <p className="dp_upload_text">
                                        <span className="dp_upload_link">Cliquez pour importer</span> ou glissez-déposez ici
                                    </p>
                                    <p className="dp_upload_hint">SVG, PNG, JPG ou GIF (max. 800x400px)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Branding */}
                    <div className="dp_form_section">
                        <div className="dp_form_label_container">
                            <label className="dp_form_label">Branding</label>
                            <p className="dp_form_description">Ajoutez votre logo dans les rapports et emails.</p>
                            <button className="dp_view_examples_button">Voir des exemples</button>
                        </div>
                        <div className="dp_form_inputs">
                            <div className="dp_checkbox_group">
                                <label className="dp_checkbox_container">
                                    <input
                                        type="checkbox"
                                        className="dp_checkbox_input"
                                        checked={includeReports}
                                        onChange={() => setIncludeReports(!includeReports)}
                                    />
                                    <span className="dp_checkbox_label">Rapports</span>
                                </label>
                                <p className="dp_checkbox_description">Inclure mon logo dans les rapports récapitulatifs.</p>
                            </div>
                            <div className="dp_checkbox_group">
                                <label className="dp_checkbox_container">
                                    <input
                                        type="checkbox"
                                        className="dp_checkbox_input"
                                        checked={includeEmails}
                                        onChange={() => setIncludeEmails(!includeEmails)}
                                    />
                                    <span className="dp_checkbox_label">Emails</span>
                                </label>
                                <p className="dp_checkbox_description">Inclure mon logo dans les emails clients.</p>
                            </div>
                        </div>
                    </div>

                    {/* Réseaux sociaux */}
                    <div className="dp_form_section">
                        <div className="dp_form_label_container">
                            <label className="dp_form_label">Profils sociaux</label>
                        </div>
                        <div className="dp_form_inputs">
                            <div className="dp_input_group dp_social_input_group">
                                <div className="dp_url_prefix">twitter.com/</div>
                                <input
                                    type="text"
                                    className="dp_text_input dp_url_input"
                                    value={twitterHandle}
                                    onChange={(e) => setTwitterHandle(e.target.value)}
                                />
                            </div>
                            <div className="dp_input_group dp_social_input_group">
                                <div className="dp_url_prefix">facebook.com/</div>
                                <input
                                    type="text"
                                    className="dp_text_input dp_url_input"
                                    value={facebookHandle}
                                    onChange={(e) => setFacebookHandle(e.target.value)}
                                />
                            </div>
                            <div className="dp_input_group dp_social_input_group">
                                <div className="dp_url_prefix">linkedin.com/company/</div>
                                <input
                                    type="text"
                                    className="dp_text_input dp_url_input"
                                    value={linkedinHandle}
                                    onChange={(e) => setLinkedinHandle(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Boutons en bas */}
                    <div className="dp_action_buttons dp_bottom_action_buttons">
                        <button className="dp_cancel_button">Annuler</button>
                        <button className="dp_save_button">Enregistrer</button>
                    </div>
                </div>

                {/* Navigation latérale */}
                <div className="dp_sidebar_navigation">
                    <ul className="dp_nav_list">
                        <li className="dp_nav_item dp_nav_item_active">
                            <span className="dp_nav_icon">👁️</span>
                            <span className="dp_nav_text">Voir le profil</span>
                            <span className="dp_nav_shortcut">⌘K+P</span>
                        </li>
                        <li className="dp_nav_item">
                            <span className="dp_nav_icon">⚙️</span>
                            <span className="dp_nav_text">Paramètres du compte</span>
                            <span className="dp_nav_shortcut">⌘S</span>
                        </li>
                        <li className="dp_nav_item">
                            <span className="dp_nav_icon">⌨️</span>
                            <span className="dp_nav_text">Raccourcis clavier</span>
                            <span className="dp_nav_shortcut">?</span>
                        </li>
                        <li className="dp_nav_item">
                            <span className="dp_nav_icon">🚪</span>
                            <span className="dp_nav_text">Se déconnecter</span>
                            <span className="dp_nav_shortcut">⌘⇧Q</span>
                        </li>
                    </ul>
                </div>

                <div className="dp_user_info">
                    <div className="dp_user_avatar">
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Frankie Sullivan" className="dp_avatar_img" />
                        <div className="dp_user_status"></div>
                    </div>
                    <div className="dp_user_details">
                        <p className="dp_user_name">Frankie Sullivan</p>
                        <p className="dp_user_email">frankie@drip.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsProfile;
