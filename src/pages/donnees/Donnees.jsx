import LayersPanel from '../../components/layersPanel/LayersPanel'
import './donnees.scss'

const Donnees = () => {
  return (
    <>
        <div className="donnees">
            <div className="donnees_wrapper">
                <div className="donnees_left">
                <h3 className="donnees_title">Filtres avancés</h3>

                <div className="donnees_filtre">
                    <label className="donnees_label">Recherche</label>
                    <input type="search" placeholder="Rechercher..." className="donnees_input" />
                </div>

                <div className="donnees_type_card">
                    <span className="donnees_span">Type des données</span>
                    {["Géographique", "Géologique", "Géochimique", "Hydrologique", "Climatique", "Autres"].map(
                    (type, index) => (
                        <div className="donnees_check_row" key={index}>
                        <input type="checkbox" id={`type-${index}`} />
                        <label htmlFor={`type-${index}`} className="donnees_check_desc">
                            {type}
                        </label>
                        </div>
                    )
                    )}
                </div>

                <div className="donnees_filtre">
                    <label className="donnees_label">Région</label>
                    <input type="text" placeholder="Ex: Kivu, Katanga..." className="donnees_input" />
                </div>

                <div className="donnees_filtre">
                    <label className="donnees_label">Date</label>
                    <input type="date" className="donnees_input" />
                </div>

                <button className="donnees_btn">Appliquer les filtres</button>
                </div>

                <div className="donnees_right">
                    <div className="donnees_top">
                        <span className="donnees_results">Résultats | Tri : Date | Abonnement requis pour télécharger</span>
                    </div>
                    <div className="donnees__bottom">
                        <div className="donnees__bottom_left">
                            <div className="donnees__left_card">
                                <span className="donnees__title_card">
                                    Titre de données (Type, Région, Date)
                                </span>

                                <div className="donnees_row">
                                    <div className="donnees_card_vignette">
                                    <img src="https://via.placeholder.com/80x80" alt="aperçu données" />
                                    </div>

                                    <div className="donnees_card_info">
                                    <p className="donnees_desc">
                                        Description des données avec un texte plus lisible, concis et adapté à la
                                        mise en valeur de l’information.
                                    </p>

                                    <div className="donnees_card_btn">
                                        <button className="detail_btn primary">Voir le détail</button>
                                        <button className="detail_btn secondary">Télécharger</button>
                                    </div>
                                    </div>
                                </div>
                            </div>

                            <div className="donnees__left_card">
                                <span className="donnees__title_card">
                                    Titre de données (Type, Région, Date)
                                </span>

                                <div className="donnees_row">
                                    <div className="donnees_card_vignette">
                                    <img src="https://via.placeholder.com/80x80" alt="aperçu données" />
                                    </div>

                                    <div className="donnees_card_info">
                                    <p className="donnees_desc">
                                        Description des données avec un texte plus lisible, concis et adapté à la
                                        mise en valeur de l’information.
                                    </p>

                                    <div className="donnees_card_btn">
                                        <button className="detail_btn primary">Voir le détail</button>
                                        <button className="detail_btn secondary">Télécharger</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="donnees__left_card">
                                <span className="donnees__title_card">
                                    Titre de données (Type, Région, Date)
                                </span>

                                <div className="donnees_row">
                                    <div className="donnees_card_vignette">
                                    <img src="https://via.placeholder.com/80x80" alt="aperçu données" />
                                    </div>

                                    <div className="donnees_card_info">
                                    <p className="donnees_desc">
                                        Description des données avec un texte plus lisible, concis et adapté à la
                                        mise en valeur de l’information.
                                    </p>

                                    <div className="donnees_card_btn">
                                        <button className="detail_btn primary">Voir le détail</button>
                                        <button className="detail_btn secondary">Télécharger</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="donnees__left_card">
                                <span className="donnees__title_card">
                                    Titre de données (Type, Région, Date)
                                </span>

                                <div className="donnees_row">
                                    <div className="donnees_card_vignette">
                                    <img src="https://via.placeholder.com/80x80" alt="aperçu données" />
                                    </div>

                                    <div className="donnees_card_info">
                                    <p className="donnees_desc">
                                        Description des données avec un texte plus lisible, concis et adapté à la
                                        mise en valeur de l’information.
                                    </p>

                                    <div className="donnees_card_btn">
                                        <button className="detail_btn primary">Voir le détail</button>
                                        <button className="detail_btn secondary">Télécharger</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="donnees__left_card">
                                <span className="donnees__title_card">
                                    Titre de données (Type, Région, Date)
                                </span>

                                <div className="donnees_row">
                                    <div className="donnees_card_vignette">
                                    <img src="https://via.placeholder.com/80x80" alt="aperçu données" />
                                    </div>

                                    <div className="donnees_card_info">
                                    <p className="donnees_desc">
                                        Description des données avec un texte plus lisible, concis et adapté à la
                                        mise en valeur de l’information.
                                    </p>

                                    <div className="donnees_card_btn">
                                        <button className="detail_btn primary">Voir le détail</button>
                                        <button className="detail_btn secondary">Télécharger</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="donnees__bottom_right">
                            <LayersPanel/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Donnees