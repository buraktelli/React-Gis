export interface IServiceModel {
    success: boolean;
    services: IServices;

}

export interface IServices {
    version: string;
    services: IService[];
    styles: any[];
    domains: any
}

export interface IService {
    id: number;
    name: string;
    alias: string;
    url: string;
    type: string;
    description: string;
    perm: number;
    priority: number;
    workspace: string;
    isactive: boolean;
    layers: ILayer[]
}
export interface ILayer {
    id: number;
    name: string;
    alias: string;
    geomtype: string;
    public: boolean;
    priority: number;
    service_id: number;
    style_id: number;
    fields: IField[];
    visible: boolean;
    perm: number;
    description: string;
}
export interface IField {
    id: number;
    layer_id: number;
    domain_id: number;
    name: string;
    type: string;
    alias: string;
    has_domain: boolean;
    priority: number;
    nullable: boolean;
    created: string;
    domain?: IDomain[];
}
export interface IDomain {
    id: number;
    desc: string;
}