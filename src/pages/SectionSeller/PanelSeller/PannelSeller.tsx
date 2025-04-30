import React, { useState } from "react"
import "./PannelSeller.css"
import { User } from "../../../Models/User"
import { Articles } from "../../../Models/Articles"
import { MoreHorizontal, Download, DollarSign, Store, Package, Users, RefreshCw, TrendingUp } from "lucide-react"
import Navbar from "../../../components/Navbar/Navbar"
import Footer from "../../../components/Footer/Footer"

interface ChartData {
    month: string;
    revenu: number;
    depenses: number;
}

const PannelSeller: React.FC = () => {
    const [periode, setPeriode] = useState<string>("Ce mois");
    
    // Données factices pour le graphique
    const chartData: ChartData[] = [
        { month: "Déc", revenu: 65000, depenses: 42000 },
        { month: "Jan", revenu: 89000, depenses: 58000 },
        { month: "Fév", revenu: 45000, depenses: 38000 },
        { month: "Mar", revenu: 53000, depenses: 44000 },
        { month: "Avr", revenu: 72000, depenses: 54000 },
    ];

    // Calcul du maximum pour dimensionner le graphique
    const maxValue = Math.max(...chartData.map(item => Math.max(item.revenu, item.depenses)));
    
    return (
        <div className="ps_container">
            <div className="ps_nav">
                <Navbar/>
            </div>
            <header className="ps_header">
                <div className="ps_welcome">
                    <h1>Bienvenue, Maxime</h1>
                    <p>Maximisez vos ventes de produits et la gestion de boutique pour obtenir les meilleurs résultats</p>
                </div>
                <div className="ps_actions">
                    <div className="ps_select_wrapper">
                        <select 
                            value={periode} 
                            onChange={(e) => setPeriode(e.target.value)}
                            className="ps_period_select"
                        >
                            <option value="Ce mois">Ce mois</option>
                            <option value="Dernier trimestre">Dernier trimestre</option>
                            <option value="Cette année">Cette année</option>
                        </select>
                    </div>
                    <button className="ps_download_btn">
                        <Download size={16} />
                        Télécharger le rapport
                    </button>
                </div>
            </header>

            <div className="ps_stats_grid">
                <div className="ps_stat_card">
                    <div className="ps_stat_icon ps_profit">
                        <DollarSign size={20} />
                    </div>
                    <div className="ps_stat_content">
                        <span className="ps_stat_label">Profit Net</span>
                        <h2 className="ps_stat_value">302,1K €</h2>
                        <div className="ps_stat_trend ps_trend_down">
                            <span>↓ 2,9% vs 300,3K l'an dernier</span>
                        </div>
                    </div>
                </div>

                <div className="ps_stat_card">
                    <div className="ps_stat_icon ps_store">
                        <Store size={20} />
                    </div>
                    <div className="ps_stat_content">
                        <span className="ps_stat_label">Boutique</span>
                        <h2 className="ps_stat_value">12 900</h2>
                        <div className="ps_stat_trend ps_trend_up">
                            <span>↑ 12,9% vs 10300 l'an dernier</span>
                        </div>
                    </div>
                </div>

                <div className="ps_stat_card">
                    <div className="ps_stat_icon ps_product">
                        <Package size={20} />
                    </div>
                    <div className="ps_stat_content">
                        <span className="ps_stat_label">Produits</span>
                        <h2 className="ps_stat_value">390 040</h2>
                        <div className="ps_stat_trend ps_trend_up">
                            <span>↑ 4,1% vs 350 580 l'an dernier</span>
                        </div>
                    </div>
                </div>

                <div className="ps_stat_card">
                    <div className="ps_stat_icon ps_visitor">
                        <Users size={20} />
                    </div>
                    <div className="ps_stat_content">
                        <span className="ps_stat_label">Visiteurs</span>
                        <h2 className="ps_stat_value">3,1M</h2>
                        <div className="ps_stat_trend ps_trend_up">
                            <span>↑ 1,7% vs 3,0M l'an dernier</span>
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
                            <MoreHorizontal size={20} />
                        </button>
                    </div>

                    <div className="ps_revenue_figures">
                        <div className="ps_figure">
                            <span className="ps_figure_label">Revenus</span>
                            <h2 className="ps_figure_value">156 098,1 €</h2>
                            <div className="ps_figure_trend ps_trend_up">
                                <span>↑ 4,1% vs 150 583 € l'an dernier</span>
                            </div>
                        </div>

                        <div className="ps_figure">
                            <span className="ps_figure_label">Dépenses</span>
                            <h2 className="ps_figure_value">80 112,02 €</h2>
                            <div className="ps_figure_trend ps_trend_down">
                                <span>↓ 2,5% vs 77 000,02 € l'an dernier</span>
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
                        
                        <div className="ps_chart_tooltip">
                            <div className="ps_tooltip_content">
                                <h4>76 500 €</h4>
                                <p>Jan 2023</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ps_product_metrics">
                    <div className="ps_product_gauge">
                        <div className="ps_gauge_header">
                            <div className="ps_gauge_title">
                                <Package size={18} />
                                <h3>Produits Vendus</h3>
                            </div>
                            <select className="ps_period_select ps_small">
                                <option>Ce mois</option>
                            </select>
                        </div>

                        <div className="ps_gauge_container">
                            <div className="ps_gauge">
                                <div className="ps_gauge_progress" style={{ transform: `rotate(${180 * (2609/3000)}deg)` }}></div>
                                <div className="ps_gauge_center">
                                    <h2>2 609</h2>
                                    <p>Produits</p>
                                    <span className="ps_gauge_trend ps_trend_up">↑ 3% vs 3 000 attendus</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="ps_visitor_growth">
                        <div className="ps_visitor_header">
                            <div className="ps_visitor_title">
                                <TrendingUp size={18} />
                                <h3>Croissance des visiteurs</h3>
                            </div>
                            <div className="ps_visitor_metric">
                                <span className="ps_trend_up">↑ 42%</span>
                                <h2>24,9K</h2>
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