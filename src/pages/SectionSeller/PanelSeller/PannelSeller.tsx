import React, { useEffect, useState } from "react";
import "./PannelSeller.css";
import { User } from "../../../Models/User";
import { Articles } from "../../../Models/Articles";
import { MoreHorizontal, Download, DollarSign, Store, Package, Users, RefreshCw, TrendingUp, Star, Heart, Shirt } from "lucide-react";
import Navbar from "../../../components/Navbar/Navbar";
import { useNavigate } from "react-router";
import { fetchArticles } from "../../../services/ArticleService";
import { fetchUser, fetchUserOrSellerById } from "../../../services/UserService";
import { toast } from "sonner";
import { useLocation } from "react-router";
import { fetchReviewById } from "../../../services/ReviewService";
import Button from "../../../components/Button/Button";

interface ChartData {
    month: string;
    revenu: number;
    depenses: number;
}

const PannelSeller: React.FC = () => {
    const location = useLocation();
    const sellerId = location.state?.userId;
    const [periode, setPeriode] = useState<string>("Ce mois");
    const [user, setUser] = useState<User | null>(null);
    const [seller, setSeller] = useState<User | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [articles, setArticles] = useState<Articles[]>([]);
    const [revenuTotal, setRevenuTotal] = useState(0);
    const [produitsVendus, setProduitsVendus] = useState(0);
    const [favoris, setFavoris] = useState(0);
    const [nombreAvis, setNombreAvis] = useState(0);
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const token = localStorage.getItem('token') || '';




    const navigate = useNavigate();

    useEffect(() => {

        const loadArticles = async () => {
            const data = await fetchArticles(token);
            if (typeof data !== "string") {
                setArticles(data);
                const sellerArticles = data.filter((article) => article.userId === sellerId);
                setArticles(sellerArticles);
            }
        };


        const loadFetchUser = async () => {
          try {
            const token = localStorage.getItem("token");
            if (!token) {
              setUser(null);
              setIsLoadingUser(false);
              return;
            }
        
            const fetchUserByToken = await fetchUser(token);
            if (fetchUserByToken === "No token") {
                setUser(null);
                setIsLoadingUser(false);
              return;
            }
        
            setUser(fetchUserByToken as User);
          } catch (error) {
            setUser(null);
          } finally {
            setIsLoadingUser(false);
          }
        };

        const loadSeller = async () => {
            if (!sellerId) return;
            const sellerData = await fetchUserOrSellerById(sellerId); 
            if (typeof sellerData !== "string") {
              setSeller(sellerData as User);
            }
          };
        

        loadSeller();
        loadFetchUser();
        loadArticles();
    }, []);

    useEffect(() => {
      if (!isLoadingUser && user === null) {
        toast.info("Session expirée ou token invalide");
          navigate("/login");
        }
      }, [user, navigate]);

    
      useEffect(() => {
        const calculateStats = async () => {
            if (articles.length === 0) return;
    
            let totalRevenue = 0;
            let totalFavoris = 0;
            let totalVendus = 0;
            let totalAvis = 0;
    
            for (const article of articles) {
                totalRevenue += article.price * 1; // suppose 1 vente/article ou ajoute soldQuantity
                totalFavoris += article.likes;
                totalVendus += 1; // simulate sold count
                const reviews = await fetchReviewById(article.id);
                if (typeof reviews !== "string") {
                    totalAvis += reviews.length;
                }
            }
    
            setRevenuTotal(totalRevenue);
            setFavoris(totalFavoris);
            setProduitsVendus(totalVendus);
            setNombreAvis(totalAvis);
    
            // simulate chartData by months
            const simulatedChart: ChartData[] = [
                { month: "Déc", revenu: totalRevenue * 0.6, depenses: totalRevenue * 0.4 },
                { month: "Jan", revenu: totalRevenue * 0.8, depenses: totalRevenue * 0.5 },
                { month: "Fév", revenu: totalRevenue * 0.4, depenses: totalRevenue * 0.3 },
                { month: "Mar", revenu: totalRevenue * 0.5, depenses: totalRevenue * 0.35 },
                { month: "Avr", revenu: totalRevenue, depenses: totalRevenue * 0.7 },
            ];
            setChartData(simulatedChart);
        };
    
        calculateStats();
    }, [articles]);
    

    // Calcul du maximum pour dimensionner le graphique
    const maxValue = Math.max(...chartData.map(item => Math.max(item.revenu, item.depenses)));
    
    return (
        <div className="ps_container">
            <div className="ps_nav">
            <Navbar user={user}  showSearch={false} />
            </div>
            <header className="ps_header">
                <div className="ps_welcome">
                    <h1>Prêt à vendre du Drip, {seller?.firstName}</h1>
                    <p>Maximisez vos ventes de produits et la gestion de votre DripStore pour obtenir les meilleurs résultats</p>
                </div>
                <div className="ps_actions">
                    <Button className="add-to-cart-btn" onClick={() => navigate("/add-drip")}>
                          <Shirt size={18} className="mr-2" />
                          Ajouter un Drip
                        </Button>
                </div>
            </header>

            <div className="ps_stats_grid">
    <div className="ps_stat_card">
        <div className="ps_stat_icon ps_profit">
            <DollarSign size={20} />
        </div>
        <div className="ps_stat_content">
            <span className="ps_stat_label">Profit Total</span>
            <h2 className="ps_stat_value">{revenuTotal.toLocaleString()} €</h2>
            <div className="ps_stat_trend ps_trend_down">
                <span>💸 On relève la tête, champion !</span>
            </div>
        </div>
    </div>

        <div className="ps_stat_card">
            <div className="ps_stat_icon ps_product">
                <Package size={20} />
            </div>
            <div className="ps_stat_content">
                <span className="ps_stat_label">Produits</span>
                <h2 className="ps_stat_value">{produitsVendus}</h2>
                <div className="ps_stat_trend ps_trend_up">
                    <span>🔥 Continue comme ça, c’est fort !</span>
                </div>
            </div>
        </div>

        <div className="ps_stat_card">
            <div className="ps_stat_icon ps_store">
                <Star size={20} />
            </div>
            <div className="ps_stat_content">
                <span className="ps_stat_label">Avis</span>
                <h2 className="ps_stat_value">{nombreAvis}</h2>
                <div className="ps_stat_trend ps_trend_up">
                    <span>⭐ Ta communauté est au top !</span>
                </div>
            </div>
        </div>

            <div className="ps_stat_card">
                <div className="ps_stat_icon ps_visitor">
                    <Heart size={20} />
                </div>
                <div className="ps_stat_content">
                    <span className="ps_stat_label">Favoris</span>
                    <h2 className="ps_stat_value">{favoris.toLocaleString()}</h2>
                    <div className="ps_stat_trend ps_trend_up">
                        <span>💖 Tes fans sont fidèles super !</span>
                    </div>
                </div>
            </div>
        </div>


            <div className="ps_charts_container">
                <div className="ps_revenue_chart">
                    <div className="ps_chart_header">
                        <div className="ps_chart_title">
                            <RefreshCw size={18} />
                            <h3>Revenus Mensuels Récurrents</h3>
                        </div>
                        <button className="ps_more_btn">
                        </button>
                    </div>

                    <div className="ps_revenue_figures">
                        <div className="ps_figure">
                            <span className="ps_figure_label">Revenus Total</span>
                            <h2 className="ps_figure_value">{revenuTotal.toLocaleString()} €</h2>
                            <div className="ps_figure_trend ps_trend_up">
                            </div>
                        </div>

                    </div>

                    <div className="ps_chart">
                        {chartData.map((item, index) => (
                            <div key={index} className="ps_chart_column">
                                <div className="ps_chart_bars">
                                    <div 
                                        className="ps_chart_bar ps_revenue_bar" 
                                        style={{ height: `${(item.revenu / maxValue) * 100}%` }}
                                        data-value={`${(item.revenu / 1000).toFixed(0)}K €`}
                                    ></div>
                                    <div 
                                        className="ps_chart_bar ps_expense_bar" 
                                        style={{ height: `${(item.depenses / maxValue) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="ps_chart_label">{item.month}</span>
                            </div>
                        ))}
                        
                    </div>
                </div>

                <div className="ps_product_metrics">
                    <div className="ps_product_gauge">
                        <div className="ps_gauge_header">
                            <div className="ps_gauge_title">
                                <Package size={18} />
                                <h3>Produits Vendus</h3>
                            </div>
                        </div>

                        <div className="ps_gauge_container">
                            <div className="ps_gauge">
                                <div className="ps_gauge_progress" style={{ transform: `rotate(${180 * (2609/3000)}deg)` }}></div>
                                <div className="ps_gauge_center">
                                    <h2>{produitsVendus}</h2>
                                    <span className="ps_gauge_trend ps_trend_up">↑ {Math.round((produitsVendus / 3000) * 100)}% vs 3 000 attendus</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="ps_visitor_growth">
                        <div className="ps_visitor_header">
                            <div className="ps_visitor_title">
                                <TrendingUp size={18} />
                                <h3>Croissance de vos favoris</h3>
                            </div>
                            <div className="ps_visitor_metric">
                            <span className="ps_trend_up">↑ {Math.round((favoris / 24000) * 100)}%</span>
                            <h2>{(favoris / 1000).toFixed(1)}K</h2>
                            </div>
                        </div>
                        <p className="ps_visitor_compare">Comparé à 27K le mois dernier</p>
                        
                        <div className="ps_categories">
                            <div className="ps_category">
                                <div className="ps_category_header">
                                    <span className="ps_category_name">Classe A</span>
                                    <span className="ps_category_value">13 028 / 15 000 utilisateurs</span>
                                </div>
                                <div className="ps_progress_bar">
                                    <div className="ps_progress ps_progress_a" style={{ width: `${(13028/15000) * 100}%` }}></div>
                                </div>
                            </div>
                            
                            <div className="ps_category">
                                <div className="ps_category_header">
                                    <span className="ps_category_name">Classe B</span>
                                    <span className="ps_category_value">11 912 / 15 000 utilisateurs</span>
                                </div>
                                <div className="ps_progress_bar">
                                    <div className="ps_progress ps_progress_b" style={{ width: `${(11912/15000) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PannelSeller