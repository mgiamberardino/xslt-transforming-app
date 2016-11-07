<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:sv="http://www.jcp.org/jcr/sv/1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<!--xsl:output method="xml" indent="yes"/-->

<xsl:template match="node()|@*">
    <xsl:copy>
        <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
</xsl:template>

<xsl:template match="//sv:property[starts-with(@sv:name, 'widgetId')]">
</xsl:template>

<xsl:template match="//sv:property[starts-with(@sv:name, 'configId')]">
</xsl:template>

<xsl:template match="//sv:node[child::sv:property[child::sv:value='tc-blossom-components:components/sharedwidget']]">
</xsl:template>
</xsl:stylesheet>
